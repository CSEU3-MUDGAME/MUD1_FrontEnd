import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";

export const login = (username, password, history) => async dispatch => {
  try {
    const { data } = await axios.post(
      "https://cswk1-mud-game.herokuapp.com/api/login/",
      {
        username,
        password
      }
    );
    localStorage.setItem("token", data.key);
    dispatch({ type: "LOGIN_SUCCESS", payload: username });
    history.push("/world");
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const register = (
  username,
  password,
  confirmPassword,
  history
) => async dispatch => {
  try {
    const { data } = await axios.post(
      "https://cswk1-mud-game.herokuapp.com/api/registration/",
      {
        username,
        password1: password,
        password2: confirmPassword
      }
    );
    localStorage.setItem("token", data.key);
    dispatch({ type: "LOGIN_SUCCESS", payload: username });
    history.push("/world");
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
