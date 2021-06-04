require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, CONNECTION_STRING, SECRET_STRING } = process.env;
let authCtrl = require("./controllers/authCtrl");
let postCtrl = require("./controllers/postCtrl");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: SECRET_STRING,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
console.log(CONNECTION_STRING);
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("GarageSellers database has connected, all is well");
});

//Auth endpoints
app.get("/api/user/", authCtrl.getUser);
app.post("/api/user/id", authCtrl.getUserById);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/logout", authCtrl.logout);
app.post("/api/auth/delete/:id", authCtrl.deleteAccount);

//Post endpoints
app.get("/api/post/:id", postCtrl.readPost);
//send the
app.post("/api/create/post", postCtrl.createPost);
app.put("/api/editing/id", postCtrl.editPost);
//send a post id from front end to delete a post
app.post("/api/post/delete", postCtrl.deletePost);
app.get("/api/posts", postCtrl.getPosts);
app.post("/api/search", postCtrl.searchAndFilter);
app.post("/api/posts/user", postCtrl.getPostsByUser);

app.listen(SERVER_PORT, () =>
  console.log(
    `Garage sellers server running on port ${SERVER_PORT}, all is well.`
  )
);
