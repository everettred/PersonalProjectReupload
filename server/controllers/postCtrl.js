//get post ti display the post selected by user using the id
// app.get("/api/post/:id", postCtrl.readPost);

//send the input fields from the front to the db
//app.post("/api/createpost", postCtrl.createPost);

//edit post based on the id fire a check to make sure session user matches the posts owner
// app.put("/api/editing/id", postCtrl.editPost);

//send a post id from front end to delete a post
//app.delete("/api/deletePost", postCtrl.deletePost);

//get all posts from new to old to be displayed on the front end
// app.get("/api/posts", postCtrl.getPosts);

//get all the posts based on a users input to the search input based on the name of the post
// app.get("/api/posts/search", postCtrl.searchAndFilter);

//get all posts made by the current user on session to be viewed on the profile screen for quick access.
// app.get("/api/posts/userid", postCtrl.getPostsByUser);

const { cloudinary } = require("../cloudinary");
module.exports = {
  //get all posts from new to old to be displayed on the front end
  getPosts: async (req, res) => {
    const db = await req.app.get("db");
    db.postSQL
      .get_posts_new_to_old()
      .then((posts) => res.status(200).send(posts));
  },

  //get all posts by defined user, using user id
  getPostsByUser: async (req, res) => {
    const db = await req.app.get("db");
    let { displayUserId } = req.body;
    let posts = await db.postSQL.get_posts_by_user({ displayUserId });
    return res.send(posts);
  },
  // get all posts with post names = to the query search, and check if a a category has been selected if no category has been selected display all categories

  searchAndFilter: async (req, res) => {
    const db = await req.app.get("db");
    let { search, categoryId } = req.body;
    if (categoryId === 0) {
      let searching = `%${search}%`;
      let searchResults = await db.postSQL.search_for_no_cat_id({ searching });
      console.log(searchResults);
      return res.status(200).send(searchResults);
    } else {
      console.log("hit cat id");
      let searching = `%${search}%`;
      let searchResults = await db.postSQL.search_for_with_cat_id({
        searching,
        categoryId,
      });
      console.log(req.body);
      return res.status(200).send(searchResults);
    }
  },

  //create a new post with a title, cover img, content, and a selected category id
  createPost: async (req, res) => {
    console.log("hit Create");
    const db = await req.app.get("db");
    let { userId, postTitle, postContent, categoryId, postTitleImg } = req.body;
    let postedTime = new Date();
    if (!postTitleImg) {
      if (userId) {
        let url = null;
        await db.postSQL.create_post({
          userId,
          postTitle,
          postContent,
          categoryId,
          postedTime,
          url,
        });
        return res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } else {
      let { url } = await cloudinary.uploader
        .upload(postTitleImg, {
          upload_preset: "garagesellers",
        })
        .catch(() => {
          console.log("no image upload defined");
        });
      if (userId) {
        await db.postSQL.create_post({
          userId,
          postTitle,
          postContent,
          categoryId,
          postedTime,
          url,
        });
        return res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    }
  },

  editPost: async (req, res) => {
    console.log("hit edit");
    const db = await req.app.get("db");
    let { postID, postTitle, postContent, categoryId } = req.body;
    if (postID) {
      await db.postSQL.edit_post({
        postID,
        postTitle,
        postContent,
        categoryId,
      });
      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  },
  //send a post id from the front end to delete a post
  deletePost: (req, res) => {
    let { postId } = req.body;
    console.log(req.body);
    req.app
      .get("db")
      .postSQL.delete_post({ postId })
      .then(() => res.sendStatus(200));
  },

  readPost: (req, res) => {
    let postId = req.params.id.replace(/:/g, "");
    console.log("hit read");
    req.app
      .get("db")
      .postSQL.read_post({ postId })
      .then((post) =>
        post[0] ? res.status(200).send(post[0]) : res.status(404).send({})
      );
  },
};
