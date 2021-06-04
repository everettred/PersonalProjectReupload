import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import PostCard from "../Post/PostCard";
import "../../gsstyling.css";
import searchIcon from "../assets/Search-icon.svg";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      categoryId: 0,
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val,
    });
  }

  getPosts() {
    axios.get("/api/posts").then((res) => {
      this.setState({ posts: res.data });
    });
  }

  handleSearch = () => {
    console.log("hit search");
    axios.post("/api/search", this.state).then((res) => {
      //console.log(res.data);
      this.setState({ posts: res.data });
    });
  };
  render() {
    let displayPosts = this.state.posts.map((e) => {
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
            onChange={(e) => this.handleChange("categoryId", e.target.value)}
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
                this.handleSearch();
              }}
              alt="Search"
            ></img>
            <input
              className="search-input"
              onChange={(e) => this.handleChange("search", e.target.value)}
              placeholder="Search something"
            ></input>
          </section>
        </section>
        <div className="post-list-style">{displayPosts}</div>
      </section>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Listings);
