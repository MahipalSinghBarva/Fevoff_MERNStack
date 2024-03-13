import { CLEAR_ERRORS } from "../Constants/productConstant";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  LOAD_USER_ADDRESS_REQUEST,
  LOAD_USER_ADDRESS_SUCCESS,
  LOAD_USER_ADDRESS_FAIL,
  LOGOUT_SUCCESS,
  EDIT_USER_ADDRESS_REQUEST,
  EDIT_USER_ADDRESS_SUCCESS,
  EDIT_USER_ADDRESS_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  OTP_VERIFICATION_REQUEST,
  OTP_VERIFICATION_SUCCESS,
  OTP_VERIFICATION_FAIL,
} from "../Constants/userConstants";

import axios from "axios";

export const login = (userData, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:3001/api/login",
      { userData, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    if (data.status === true) {
      console.log(data);
      localStorage.setItem("JWTToken", data.jwtToken);
      localStorage.setItem("id", data.data._id);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("contact", data.data.contact);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:3001/api/users",
      userData,
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.get(
      `http://localhost:3001/api/users/${userId}`,
      config
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    console.log(data);
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/api/user/${userId}`
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

export const getUserAddress = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_ADDRESS_REQUEST });
    // const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.get(
      `http://localhost:3001/api/users-address/${userId}`
    );
    dispatch({ type: LOAD_USER_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editUserAddress =
  (addressId, updatedAddressData) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_USER_ADDRESS_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `http://localhost:3001/api/users-address/${addressId}`,
        updatedAddressData,
        config
      );
      dispatch({ type: EDIT_USER_ADDRESS_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: EDIT_USER_ADDRESS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const sendOtp = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `http://localhost:3001/api/send-otp`,
      userData,
      config
    );
    dispatch({ type: SEND_OTP_SUCCESS, payload: data });
    localStorage.setItem("id", data.data.userId);
  } catch (error) {
    dispatch({ type: SEND_OTP_FAIL, payload: error.response.data.message });
  }
};

export const verifyOtp = (userId, userOtp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_VERIFICATION_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `http://localhost:3001/api/otp-verification`,
      userId,
      userOtp,
      config
    );
    dispatch({ type: OTP_VERIFICATION_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({ type: OTP_VERIFICATION_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
