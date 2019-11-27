import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from "./../loader.gif";
import "./posts.css";

const Posts = ({ posts, toggle, fetchData, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={posts.length >= 10 ? <img src={loader} alt="loader" /> : null}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <ul className="list-group">
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
    </InfiniteScroll>
  );
};

export default Posts;
