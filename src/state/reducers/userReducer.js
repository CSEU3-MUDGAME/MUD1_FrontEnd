const initialState = {
  username: "",
  currentPosition: {},
  loggedIn: false,
  loading: false,
  error: "",
  otherUsers: []
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

    case "INITIALIZE_SUCCESS":
      return {
        ...state,
        username: action.payload.name,
        currentPosition: {
          name: action.payload.title,
          description: action.payload.description
        },
        otherUsers: [...action.payload.players],
        loggedIn: true
      };

    case "MOVE_SUCCESS":
      return {
        ...state,
        username: action.payload.name,
        currentPosition: {
          name: action.payload.title,
          description: action.payload.description
        },
        otherUsers: [...action.payload.players]
      };

    default:
      return state;
  }
};

export default userReducer;
