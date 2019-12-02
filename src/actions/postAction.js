import store from "./../store/store";

export const fetchPostsBegin = () => ({
  type: "FETCH_POSTS_BEGIN"
});

export const fetchPostsSuccess = posts => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: "FETCH_POSTS_FAILURE",
  payload: { error }
});

export const updatePostsBegin = () => ({
  type: "UPDATE_POSTS_BEGIN"
});

export const updatePostsSuccess = posts => ({
  type: "UPDATE_POSTS_SUCCESS",
  payload: { posts }
});

export const updatePostsFailure = error => ({
  type: "UPDATE_POSTS_FAILURE",
  payload: { error }
});

export const patchPostsBegin = () => ({
  type: "PATCH_POSTS_BEGIN"
});

export const patchPostsSuccess = () => ({
  type: "PATCH_POSTS_SUCCESS"
});

export const patchPostsFailure = error => ({
  type: "PATCH_POSTS_FAILURE",
  payload: { error }
});

export const fetchPostsData = () => {
  store.dispatch(fetchPostsBegin());
  return (dispatch, getState) => {
    const { start, postsPerPage } = getState();
    return fetch(
      `http://localhost:3003/posts?_start=${start}&_limit=${postsPerPage}`
    )
      .then(data => data.json())
      .then(data => store.dispatch(fetchPostsSuccess(data)))
      .catch(err => store.dispatch(fetchPostsFailure(err)));
  };
};

export const updatePostsData = () => {
  store.dispatch(updatePostsBegin());
  return function(dispatch, getState) {
    const { start, postsPerPage } = getState();
    return fetch(
      `http://localhost:3003/posts?_start=${start}&_limit=${postsPerPage}`
    )
      .then(data => data.json())
      .then(data => {
        if (data === undefined || data == null || data.length <= 0) {
          throw new Error("No such user found!!");
        } else store.dispatch(updatePostsSuccess(data));
      })
      .catch(err => store.dispatch(updatePostsFailure(err)));
  };
};

export const patchPostsData = (id, isFav) => {
  store.dispatch(patchPostsBegin());
  return function(dispatch) {
    return fetch(`http://localhost:3003/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isFavourite: !isFav
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("No such user found!!");
        } else store.dispatch(patchPostsSuccess());
      })
      .catch(err => store.dispatch(patchPostsFailure(err)));
  };
};
