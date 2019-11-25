import React, { Component } from "react";
import Posts from "./posts";
import Pagination from "./pagination";

class PostsList extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    totalPost: 0,
    loading: false
  };

  componentDidMount() {
    const fetchPostsData = async () => {
      this.setState({
        loading: true
      });

      const posts = await fetch(
        `http://localhost:3003/posts?_page=${this.state.currentPage}&_limit=${this.state.postsPerPage}`
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
          posts: posts,
          loading: false
        });
      }
    };
    fetchPostsData();
  }

  render() {
    const paginate = async pageNumber => {
      await this.setState({ currentPage: pageNumber });
      updatePostsData();
    };

    const updatePostsData = async () => {
      this.setState({
        loading: true
      });

      const updatedPosts = await fetch(
        `http://localhost:3003/posts?_page=${this.state.currentPage}&_limit=${this.state.postsPerPage}`
      ).then(response => response.json());

      this.setState({
        posts: updatedPosts,
        loading: false
      });
      console.log(this.state);
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
      <div>
        <Posts
          posts={this.state.posts}
          loading={this.state.loading}
          toggle={patchPostsData}
        />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.totalPost}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default PostsList;
