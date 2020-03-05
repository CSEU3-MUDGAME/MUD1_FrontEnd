import React, { useEffect } from "react";
import { connect } from "react-redux";
import Player from "../player";
import Map from "../map";
import store from "../../state/store";
import { updateTiles } from "../../data/maps/1";
import { initialize } from "../../state/actions/user";

function World(props) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
  let tiles = [];
  const getTiles = async () => {
    tiles = await updateTiles();

    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles
      }
    });
  };

  useEffect(() => {
    const start = async () => {
      await getTiles();
      props.initialize();
    };

    start();
  }, []);

  return (
    <div className="entire-page">
      <h1>Field Explorer</h1>
      <div className="main">
        <div
          style={{
            position: "relative",
            width: "1000px",
            maxHeight: "1200px",
            margin: "20px auto"
          }}
        >
          <Map />
          <Player />
        </div>
        <div className="info">
          <p>Current Room: {props.title ? props.title : 0}</p>
          <p>Room Description: {props.description ? props.description : ""}</p>
          <p>Reach the Treasure room: Navigate with your arrow keys</p>
          <p>Other Players</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player
  };
}

export default connect(mapStateToProps, { initialize })(World);
