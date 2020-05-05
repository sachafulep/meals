import React from "react";

class CreateHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="LoginDiv">
        <input placeholder="Household name"></input>
        <div>
          {" "}
          <button>Confirm</button>
        </div>
      </div>
    );
  }
}

export default CreateHousehold;
