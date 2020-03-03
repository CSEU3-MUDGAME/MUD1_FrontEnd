import React from 'react';
import './styles.css'

function Map(props){
  function getTileSprite(type){
    switch(type){
      case 0:
        return 'grass'
      case 5:
        return 'rock'
      case 6:
        return 'tree'
      default:
        return 'grass'
    }
  }

  function MapTile(props) {
    return <div
      className={`${getTileSprite(props.tile)}`}
      style={{
        height: '40px',
        minWidth: '40px'
      }}
    ></div>
  }
  function  MapRow(props){
    return <div className='tile'
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
      >
      {
        props.tiles.map(tile => <MapTile tile={tile} />)
      }
      </div>
    }

  return(
    <div
      style={{
        position: 'relative',
        top: '0px',
        left: '0px',
        width: '800px',
        height: '400px',
        border: '4px solid white'
      }}>
       {
         props.tiles.map( row => <MapRow tiles={row} />)
       }
    </div>
  )
}


export default Map;