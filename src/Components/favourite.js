import React, { Component } from "react";
import Posts from "./posts";

class Favourite extends Component {
  state = {
    posts: [],
    start: 0,
    postsPerPage: 10,
    totalPost: 0,
    hasMore: true
  };

  componentDidMount() {
    const fetchFavouritePosts = async () => {
      const posts = await fetch(
        `http://localhost:3003/posts?isFavourite=true&_start=${this.state.start}&_limit=${this.state.postsPerPage}`
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
    fetchFavouritePosts();
  }

  render() {
    const updateFavouritePostsData = async () => {
      await this.setState({
        start: this.state.start + this.state.postsPerPage
      });

      if (this.state.start < this.state.totalPost) {
        const updatedFavouritePosts = await fetch(
          `http://localhost:3003/posts?isFavourite=true&_start=${this.state.start}&_limit=${this.state.postsPerPage}`
        ).then(response => response.json());

        this.setState({
          posts: this.state.posts.concat(updatedFavouritePosts)
        });
        console.log(this.state);
      } else {
        this.setState({ hasMore: false });
      }
    };

    const patchPostsData = async (id, isFav) => {
      await fetch(`http://localhost:3003/posts/${id}`, {
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
      resetFavouritePostsData();
    };

    const resetFavouritePostsData = async () => {
      const resetedFavouritePosts = await fetch(
        `http://localhost:3003/posts?isFavourite=true&_start=0&_limit=${this
          .state.start + this.state.postsPerPage}`
      ).then(response => response.json());

      this.setState({
        posts: resetedFavouritePosts
      });
      console.log(this.state);
    };

    return (
      <div style={{ padding: "3em 2em" }}>
        <Posts
          posts={this.state.posts}
          toggle={patchPostsData}
          fetchData={updateFavouritePostsData}
          hasMore={this.state.hasMore}
        />
      </div>
    );
  }
}

export default Favourite;
