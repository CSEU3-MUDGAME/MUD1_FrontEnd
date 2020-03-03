import React from 'react'
import Player from '../player';
import Map from '../map';
import store from '../../config/store';
import { tiles } from '../../data/maps/1';

function World(props){
  store.dispatch({ 
    type: 'ADD_TILES',
    payload: {
      tiles
    }
  })
  return(
    <div
      style={{
        position: 'relative',
        width: '1600px',
        height: '400px',
        margin: '20px auto'
      }}
    >
      <Map />
      <Player />
    </div>
  )
}

export default World