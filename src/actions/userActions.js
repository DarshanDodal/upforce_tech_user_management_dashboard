// userActions.js

import * as api from "../api/userApi";
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

export const fetchAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS_REQUEST });
  try {
    const data = await api.getAllUsers();
    dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ALL_USERS_FAILURE, payload: error.message });
  }
};

export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const data = await api.createUser(userData);
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
      message: "Successfuly created user.",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error.message,
    });
  }
};

export const editUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  try {
    const data = await api.editUser(userId, userData);
    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: data,
      message: "Successfuly edited user.",
    });
  } catch (error) {
    dispatch({ type: EDIT_USER_FAILURE, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    await api.deleteUser(userId);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: userId,
      message: "Successfuly deleted user.",
    });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};

export const searchUsers = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USERS_REQUEST });
  try {
    const data = await api.searchUsers(query);
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_USERS_FAILURE, payload: error.message });
  }
};

export const exportUsersToCSV = () => async (dispatch) => {
  dispatch({ type: EXPORT_USERS_REQUEST });
  try {
    await api.exportUsersToCSV();
    dispatch({
      type: EXPORT_USERS_SUCCESS,
      message: "Successfuly exported all users in csv format",
    });
  } catch (error) {
    dispatch({ type: EXPORT_USERS_FAILURE, payload: error.message });
  }
};

export const clearError = () => ({ type: CLEAR_ERROR });

export const clearSuccess = () => ({ type: CLEAR_SUCCESS });
