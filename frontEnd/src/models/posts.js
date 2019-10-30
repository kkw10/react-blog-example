import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createRequestActionTypes('posts/LIST_POSTS');

export const listPosts = ({ tag, username, page }) => ({
  type: LIST_POSTS,
  payload: {
    tag,
    username,
    page
  }
});

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPost);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
};

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        lastPage: parseInt(action.meta.headers['last-page'], 10),
      }
    case LIST_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default reducer;