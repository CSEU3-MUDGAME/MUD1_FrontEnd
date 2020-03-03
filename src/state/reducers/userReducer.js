const initialState = {
  username: "",
  currentPosition: [],
  loggedIn: false,
  loading: false,
  error: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loading: true,
        error: ""
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        username: action.payload,
        loading: false,
        loggedIn: true,
        error: ""
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
