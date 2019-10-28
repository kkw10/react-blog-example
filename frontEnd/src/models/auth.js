import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

// actions names
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');


// actions functions
export const changeField = ({ form, key, value }) => ({
  type: CHANGE_FIELD,
  data: {
    form,
    key,
    value,
  }
})

export const initializeForm = (form) => ({
  type: INITIALIZE_FORM,
  data: {
    form
  }
})

export const register = ({ username, password }) => (
  {
    type: REGISTER,
    payload: {
      username,
      password
    }
  }
)

export const login = ({ username, password }) => (
  {
    type: LOGIN,
    payload: {
      username,
      password
    }
  }
)

// saga 
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// initial state
const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD: 
      return {
        ...state,
        [action.data.form]: {
          ...state[action.data.form],
          [action.data.key]: action.data.value 
        }
      }
    case INITIALIZE_FORM: 
      return {
        ...state,
        [action.data.form]: state[action.data.form],
        authError: null,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        authError: null,
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        auth: action,
        authError: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        authError: null,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        authError: action.payload
      }      
    default:
      return state;
  }
};

export default reducer;
