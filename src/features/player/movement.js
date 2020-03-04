import store from '../../state/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

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
  
  function directionMove(newPos){
    
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos
      }
    })
  }

  function handleKeyDown(e) {
    e.preventDefault()

    switch(e.keyCode){
      case 37:
        return attemptMove('WEST')
      case 38:
        return attemptMove('NORTH')
      case 39:
        return attemptMove('EAST')
      case 40:
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