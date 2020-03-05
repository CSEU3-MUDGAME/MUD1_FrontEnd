import store from '../../state/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'
import { getInfo } from '../../data/maps/1';
import axiosWithAuth from '../../utils/axiosWithAuth'

export default function handleMovement(player) {
  function attemptMove(direction){
    const oldPos = store.getState().player.position
    const newPos = getNewPosition(direction)

    if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos,newPos)){
      directionMove(newPos)
    }
  }
  function getNewPosition(direction) {
    const oldPos = store.getState().player.position
    
    switch(direction) {
      case 'WEST':
        return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
      case 'EAST':
        return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
      case 'NORTH':
        return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
      case 'SOUTH':
        return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
      default:
        return [ oldPos[0], oldPos[1] ]
    }
  }
  const getDescription = async(room_num) => {
    const tiles = await getInfo();
    const newId = tiles[room_num].id;

    store.dispatch({ type: "MOVE" });
    try {
      const { data } = await axiosWithAuth().post("/api/adv/move", { newId });
      store.dispatch({ type: "MOVE_SUCCESS", payload: data });
    } catch (error) {
      store.dispatch({ type: "MOVE_FAILURE", payload: error.message });
    }
  }

  function observeBoundaries (oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH &&
      newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT) ? true : false
  }

  function observeImpassable(oldPos, newPos){
    const tiles = store.getState().map.tiles
    const y = newPos[1] / 23
    const x = newPos[0] / 23
    const nextTile = tiles[y][x]

    return nextTile < 2 ? true : false
  }
  
  const directionMove = async (newPos) => {
    let vPos = newPos[0]/23;
    let hPos = newPos[1]/23;
    vPos = parseInt(vPos/5);
    hPos = parseInt(hPos/3);
    const roomKey = hPos*10 + vPos;
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        room: roomKey
      }
    })
    
    await getDescription(roomKey);
  }

  function handleKeyDown(e) {

    switch(e.keyCode){
      case 37:
        e.preventDefault()
        return attemptMove('WEST')
      case 38:
        e.preventDefault()
        return attemptMove('NORTH')
      case 39:
        e.preventDefault()
        return attemptMove('EAST')
      case 40:
        e.preventDefault()
        return attemptMove('SOUTH')
      default:
        console.log(e.keyCode)
    }
  }
  
  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })
  return player
}