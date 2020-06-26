import React from "react";
import constants from "../helpers/constants";

const screens = constants.get("screens");

class SelectHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    }

  render() {
    return (
      <div id="SelectHouseholdDiv">
        <input placeholder="Enter household name"></input>
        <div>
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

export default SelectHousehold;
