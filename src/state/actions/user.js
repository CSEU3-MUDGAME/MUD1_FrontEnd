import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";

export const login = (username, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      "https://lambda-mud-test.herokuapp.com/api/login",
      {
        username,
        password
      }
    );
    localStorage.setItem("token", data.key);
    dispatch({ type: "LOGIN_SUCCESS", payload: username });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const register = (username, password) => async dispatch => {
  try {
    const { data } = await axios.post(
      "https://lambda-mud-test.herokuapp.com/api/registration",
      {
        username,
        password
      }
    );
    localStorage.setItem("token", data.key);
    dispatch({ type: "LOGIN_SUCCESS", payload: username });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const initialize = () => async dispatch => {
  dispatch({ type: "INITIALIZE" });
  try {
    const { data } = await axiosWithAuth().post("/api/adv/init");
    dispatch({ type: "INITIALIZE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "INITIALIZE_FAILURE", payload: error.message });
  }
};
