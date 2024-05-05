// userReducer.js

import {
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  EXPORT_USERS_REQUEST,
  EXPORT_USERS_SUCCESS,
  EXPORT_USERS_FAILURE,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case SEARCH_USERS_REQUEST:
    case EXPORT_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        success: action.message,
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false,
        success: action.message,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
        success: action.message,
      };

    case SEARCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };

    case EXPORT_USERS_SUCCESS:
      return { ...state, loading: false, success: action.message };

    case FETCH_ALL_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case EDIT_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case SEARCH_USERS_FAILURE:
    case EXPORT_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_SUCCESS:
      return { ...state, success: null };

    default:
      return state;
  }
};

export default userReducer;
