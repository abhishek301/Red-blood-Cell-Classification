import React, { Component } from "react";
import Posts from "./posts";

class PostsList extends Component {
  state = {
    posts: [],
    start: 0,
    postsPerPage: 10,
    totalPost: 0,
    hasMore: true
  };

  componentDidMount() {
    const fetchPostsData = async () => {
      const posts = await fetch(
        `http://localhost:3003/posts?_start=${this.state.start}&_limit=${this.state.postsPerPage}`
      )
        .then(response => {
          this.setState({
            totalPost: response.headers.get("X-Total-Count")
          });

          return response.json();
        })
        .catch(function(e) {
          console.log(e);
        });
      if (posts) {
        this.setState({
          posts: posts
        });
      }
    };
    fetchPostsData();
  }

  render() {
    const updatePostsData = async () => {
      await this.setState({
        start: this.state.start + this.state.postsPerPage
      });

      if (this.state.start < this.state.totalPost) {
        const updatedPosts = await fetch(
          `http://localhost:3003/posts?_start=${this.state.start}&_limit=${this.state.postsPerPage}`
        ).then(response => response.json());

        this.setState({
          posts: this.state.posts.concat(updatedPosts)
        });
        console.log(this.state);
      } else {
        this.setState({ hasMore: false });
      }
    };

    const patchPostsData = (id, isFav) => {
      fetch(`http://localhost:3003/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isFavourite: !isFav
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => console.log(json));
    };

    return (
      <div style={{ padding: "3em 2em" }}>
        <Posts
          posts={this.state.posts}
          toggle={patchPostsData}
          fetchData={updatePostsData}
          hasMore={this.state.hasMore}
        />
      </div>
    );
  }
}

export default PostsList;
