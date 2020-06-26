import React from "react";
import constants from "../helpers/constants";
import Database from "../helpers/database";

const screens = constants.get("screens");

class SelectHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="SelectHouseholdDiv">
        <input
          id="InputSelectHousehold"
          placeholder="Enter household name"
        ></input>
        <div>
          <button
            onClick={() => {
              const input = document.getElementById("InputSelectHousehold");
              const name = input.value;
              Database.selectHousehold(name, (household) =>
                this.props.selectHouseholdCallback(household)
              );
            }}
          >
            Confirm
          </button>
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
