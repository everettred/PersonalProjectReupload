import React from "react";
import { Switch, Route } from "react-router-dom";
import Listings from "./components/Listings/Listings";
import ProfileView from "./components/Authentication/ProfileView";
import LoginInput from "./components/Authentication/LoginInput";
import PostView from "./components/Post/PostView";
import PostEditor from "./components/Post/PostEditor";

export default (
  <Switch>
    <Route exact path="/listings" component={Listings} />
    <Route exact path="/profile/:Userid" component={ProfileView} />
    <Route exact path="/post/:id" component={PostView} />
    <Route exact path="/login" component={LoginInput} />
    <Route exact path="/edit" component={PostEditor} />
  </Switch>
);
