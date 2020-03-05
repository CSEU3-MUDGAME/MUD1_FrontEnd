const initialState = {
  position: [0, 0],
  room: 0,
  title: "Kingstow",
  description: "A short fallen temple in a shadowy grove marks the entrance to this dungeon Beyond the broken statue lies a grand, ragged room Your torch allows you to see remnants of statues, weathered and dismantled by time itself."
}

const playerReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default playerReducer