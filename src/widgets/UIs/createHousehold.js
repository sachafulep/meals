import React from "react";
import Database from "../../helpers/database";

class CreateHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="DivCreateHousehold">
        <input id="InputCreateHousehold" placeholder="Household name"></input>
        <div>
          <button
            onClick={() => {
              const input = document.getElementById("InputCreateHousehold");
              const name = input.value;
              if (name.length > 0) {
                Database.insertHousehold(name, (household) =>
                  this.props.selectHouseholdCallback(household)
                );
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default CreateHousehold;
