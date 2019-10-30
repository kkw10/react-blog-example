import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');

export const initialize = () => ({
  type: INITIALIZE
})

export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value
  }
})

export const writePost = ({ title, body, tags }) => ({
  type: WRITE_POST,
  payload: {
    title,
    body,
    tags
  }
})

export const setOriginalPost = (post) => ({
  type: SET_ORIGINAL_POST,
  payload: post
})

export const updatePost = ({ id, title, body, tags }) => ({
  type: UPDATE_POST,
  payload: {
    id,
    title,
    body,
    tags
  }
})

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState
      }
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload
      }
    case WRITE_POST_FAILURE:
      return {
        ...state,
        postError: action.payload
      }
    case SET_ORIGINAL_POST:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        tags: action.payload.tags,
        originalPostId: action.payload._id
      }
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload
      }
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        postError: action.payload
      }
    default:
      return state;
  }
} 

export default reducer;