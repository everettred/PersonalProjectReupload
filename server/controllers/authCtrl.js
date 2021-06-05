// app.get("/api/auth/me", authCtrl.getUser);
// app.post("/api/auth/login", authCtrl.login);
// app.post("/api/auth/register", authCtrl.register);
// app.post("/a{pi/auth/logout", authCtrl.logout);
//db functions used (db.user.find_user_by_username({ username });)
//                   db.authSQL.create_user({ username, hash });

const bcrypt = require("bcryptjs");
const session = require("express-session");
module.exports = {
  // app.post("/api/auth/login", authCtrl.login);
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    let [existingUser] = await db.authSQL.find_user_by_username({ username });
    if (!existingUser) {
      return res.status(404).send("user does not exist or is incorrect");
    }
    const authenticated = bcrypt.compareSync(
      password,
      existingUser.password_hash
    );
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }
    delete existingUser.password_hash;
    req.session.user = existingUser;
    return res.status(200).send(req.session.user);
  },
  //app.post("/api/auth/register", authCtrl.register);
  register: async (req, res) => {
    console.log("hit register");
    const db = await req.app.get("db");
    let { username, password } = req.body;
    let existingUser = await db.authSQL.find_user_by_username({ username });
    //here we check if there is a user alredy in our db. User will be sent back in an array at index 0 if there is. existingUser[array index 0]
    if (existingUser[0]) {
      return res.status(300).send("Username exists please try another one");
    }
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);
    //here we create our user by sedning a username and hash then removing the password before it is sent to our front end
    const newUser = await db.authSQL.create_user({ username, hash });
    delete newUser[0].password_hash;
    req.session.user = newUser[0];
    return res.status(200).send(req.session.user);
  },
  //app.get("/api/auth/me", authCtrl.getUser);
  //
  getUserById: async (req, res) => {
    const db = await req.app.get("db");
    let { displayUserId } = req.body;
    const gotUser = await db.authSQL.get_user_by_id({ displayUserId });
    if (gotUser[0]) {
      delete gotUser[0].password_hash;
    } else return console.log("");

    if (req.session.user) {
      if (displayUserId == req.session.user.user_id) {
        return res.send({ user: req.session.user, isOwner: true });
      } else return res.send({ user: gotUser[0], isOwner: false });
    } else return res.send({ user: gotUser[0], isOwner: false });
  },
  // if (displayUserId == req.session.user.user_id) {
  //   return res.send(req.session.user);
  // } else return gotUser[0];
  //},
  getUser: (req, res) => {
    if (!req.session.user) {
      console.log("session does not exist");
      return res.sendStatus(404);
    } else return res.send(req.session.user);
  },

  // app.post("/api/auth/logout", authCtrl.logout);
  logout: (req, res) => {
    req.session.destroy();
    console.log("hit logout");
    return res.sendStatus(200);
  },
  deleteAccount: (req, res) => {
    let userID = req.params.id.replace(/:/g, "");
    req.app.get("db").authSQL.delete_account({ userID });
    req.app.get("db").postSQL.delete_account_posts({ userID });
    return res.sendStatus(200);
  },
};
