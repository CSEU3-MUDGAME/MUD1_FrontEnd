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
            maxHeight: "1200px"
          }}
        >
          <Map />
          <Player />
        </div>
        <div className="info">
          <p className="world-ui">
            Current Room:{" "}
            {props.currentPosition ? props.currentPosition.name : 0}
          </p>
          <p className="world-ui">
            Room Description:{" "}
            {props.currentPosition ? props.currentPosition.description : ""}
          </p>
          <p
            style={{
              backgroundColor: `${props.room === 99 ? "yellow" : "lightgreen"}`
            }}
          >
            {props.room === 99
              ? "Mission Accomplished!"
              : "Reach the Treasure room: Navigate with your arrow keys"}
          </p>
          <p className="world-ui">
            Other Players In Same Room: <br />
            {props.otherUsers.map(user => (
              <>
                {user}
                <br />
              </>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
    ...state.user
  };
}

export default connect(mapStateToProps, { initialize })(World);
