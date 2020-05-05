import React from "react";
const screens = { splash: 1, createHousehold: 2 };

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="LoginDiv">
        <input placeholder="Paste household ID here"></input>
        <div>
          {" "}
          <button>Confirm</button>
        </div>
        <p>or</p>
        <button
          onClick={() =>
            this.props.selectScreenCallback(screens.createHousehold)
          }
        >
          Create new household
        </button>
      </div>
    );
  }
}

export default Splash;
