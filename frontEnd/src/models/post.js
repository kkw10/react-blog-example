import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost = (id) => ({
  type: READ_POST,
  payload: id
})

export const unloadPost = () => ({
  type: UNLOAD_POST
})

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POST_SUCCESS:
      return {
        ...state,
        post: action.payload
      }
    case READ_POST_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case UNLOAD_POST:
      return {
        ...initialState
      }
    default:
      return state;
  }
}

export default reducer;

