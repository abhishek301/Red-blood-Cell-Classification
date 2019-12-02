const initialState = {
  isFetching: false,
  isError: null,
  posts: [],
  start: 0,
  postsPerPage: 10,
  totalPost: 0,
  hasMore: true
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS_BEGIN":
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        isFetching: true,
        start: 0,
        isError: null,
        hasMore: true
      };

    case "FETCH_POSTS_SUCCESS":
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        isFetching: false,
        posts: action.payload.posts,
        start: state.start + state.postsPerPage,
        totalPost: action.payload.totalposts
      };

    case "FETCH_POSTS_FAILURE":
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        isFetching: false,
        isError: action.payload.error,
        posts: []
      };

    case "UPDATE_POSTS_BEGIN":
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        isFetching: true,
        isError: null
      };

    case "UPDATE_POSTS_SUCCESS":
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        isFetching: false,
        posts: [...state.posts, ...action.payload.posts],
        start: state.start + state.postsPerPage
      };

    case "UPDATE_POSTS_FAILURE":
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        isFetching: false,
        isError: action.payload.error,
        hasMore: false
      };

    case "PATCH_POSTS_BEGIN":
      return {
        ...state,
        isFetching: true,
        isError: null
      };

    case "PATCH_POSTS_SUCCESS":
      return {
        ...state,
        isFetching: false
      };

    case "PATCH_POSTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        isError: action.payload.error
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
