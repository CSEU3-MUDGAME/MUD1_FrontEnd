import React from 'react'
import { connect } from 'react-redux';
import Player from '../player';
import Map from '../map';
import store from '../../state/store';
import { updateTiles } from '../../data/maps/1';

function World(props) {
  const getTiles = async () => {
    const tiles = await updateTiles();

    store.dispatch({ 
      type: 'ADD_TILES',
      payload: {
        tiles
      }
    })
    console.log(tiles)
  }

  getTiles();
  
  return(
    <div className="main">
      <div
      style={{
        position: 'relative',
        width: '1000px',
        maxHeight: '1200px',
        margin: '20px auto'
      }}
      >
        <Map />
        <Player />
      </div>
      <div className="info">
        <p>Current Room: {props.position ? props.position[1] : props.position}</p>
        <p>North: </p>
        <p>South: </p>
        <p>East: </p>
        <p>West: </p>
        <p>
          Reach the Treasure room: Navigate with your arrow keys
        </p>
      </div>
    </div>
  )
}

function getCurrentRoom(pos1){
  console.log(pos1)
}

function mapStateToProps(state){
  return {
    position: state.map.position
  }
}

export default connect(mapStateToProps)(World);