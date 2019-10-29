import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = (user) => ({
  type: TEMP_SET_USER,
  payload: user
})

export const check = () => ({
  type: CHECK
})

export const logout = () => ({
  type: LOGOUT
})

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSage() {
  try {
    localStorage.removeItem('user');

  } catch (e) {
    console.log('localStoarage is not working...')
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch(e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSage);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMP_SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case CHECK_SUCCESS:
      return {
        ...state,
        user: action.payload,
        checkError: null
      }
    case CHECK_FAILURE:
      return {
        ...state,
        user: null,
        checkError: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export default reducer;