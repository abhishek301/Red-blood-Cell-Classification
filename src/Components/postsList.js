import React, { Component } from "react";
import Posts from "./posts";
import { connect } from "react-redux";
import {
  fetchPostsData,
  updatePostsData,
  patchPostsData
} from "./../actions/postAction";

class PostsList extends Component {
  state = {
    posts: [],
    start: 0,
    postsPerPage: 10,
    totalPost: 0,
    hasMore: true
  };

  componentDidMount() {
    this.props.dispatch(fetchPostsData());
  }

  render() {
    const updatePosts = () => {
      this.props.dispatch(updatePostsData());
    };
    console.log(this.props.data);

    const patchPosts = (id, isFav) => {
      this.props.dispatch(patchPostsData(id, isFav));
    };

    return (
      <div style={{ padding: "3em 2em" }}>
        <Posts
          posts={this.props.data.posts}
          toggle={patchPosts}
          fetchData={updatePosts}
          hasMore={this.props.data.hasMore}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(mapStateToProps)(PostsList);
