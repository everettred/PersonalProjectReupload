import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PostCard from "../Post/PostCard";
import "../../gsstyling.css";
import searchIcon from "../assets/Search-icon.svg";
function Listings() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useLayoutEffect(() => {
    getPosts();
  }, []);

  const handleSearch = () => {
    console.log("hit search");
    axios
      .post("/api/search", { search: search, categoryId: categoryId })
      .then((res) => {
        setPosts(res.data);
      });
  };

  let displayPosts = posts.map((e) => {
    return (
      <PostCard
        title={e.post_title}
        titleImg={e.post_img_url}
        postId={e.post_id}
        key={e.post_id}
      />
    );
  });
  return (
    <section>
      <section className="search-container">
        <select
          className="category-input"
          onChange={(e) => setCategoryId(e.target.value)}
          name="Category"
          id="Category"
        >
          <option value="0">Select Category</option>
          <option value="1">Auto</option>
          <option value="2">Computers</option>
          <option value="3">General</option>
          <option value="4">Home and Garden</option>
        </select>

        <section className="search-bar">
          <img
            src={searchIcon}
            id="img-button"
            onClick={(e) => {
              handleSearch();
            }}
            alt="Search"
          ></img>
          <input
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search something"
          ></input>
        </section>
      </section>
      <div className="post-list-style">{displayPosts}</div>
    </section>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Listings);
