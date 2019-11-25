import React from "react";
import loader from "./../loader.gif";
import "./posts.css";

const Posts = ({ posts, loading, toggle }) => {
  if (loading) {
    return <img src={loader} alt="loader" />;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map(post => (
        <li key={post.id} className="list-group-item">
          {post.title}
          <input
            type="checkbox"
            defaultChecked={post.isFavourite}
            onChange={() => toggle(post.id, post.isFavourite)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
