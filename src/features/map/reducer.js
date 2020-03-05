const initialState = {
  tiles: [],
  sortedTiles: [],
  loading: false
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TILES":
      return {
        ...state,
        loading: true
      };
    case "ADD_TILES_SUCCESS":
      return {
        ...action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default mapReducer;
