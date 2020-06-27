import React from "react";
import "./App.css";
import Splash from "./widgets/UIs/splash";
import SelectHousehold from "./widgets/UIs/selectHousehold";
import CreateHousehold from "./widgets/UIs/createHousehold";
import Home from "./widgets/UIs/home";
import Modal from "./widgets/modal";

import constants from "./helpers/constants";

const screens = constants.get("screens");
const modals = constants.get("modals");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: screens.splash,
      currentHousehold: undefined,
      currentModal: undefined,
    };
  }

  selectScreen(screen) {
    this.setState({ currentScreen: screen });
  }

  selectHousehold(household) {
    this.setState({ currentHousehold: household });
    this.selectScreen(screens.home);
  }

  selectModal(key, params) {
    this.setState({ currentModal: key });
  }

  getCurrentPageWidget() {
    switch (this.state.currentScreen) {
      case screens.splash:
        return (
          <Splash
            selectScreenCallback={(screen) => this.selectScreen(screen)}
          />
        );

      case screens.selectHousehold:
        return (
          <SelectHousehold
            selectScreenCallback={(screen) => this.selectScreen(screen)}
            selectHouseholdCallback={(household) =>
              this.selectHousehold(household)
            }
          />
        );

      case screens.createHousehold:
        return (
          <CreateHousehold
            selectHouseholdCallback={(household) =>
              this.selectHousehold(household)
            }
          />
        );

      case screens.home:
        return (
          <Home
            currentHousehold={this.state.currentHousehold}
            selectModal={(key, props) => this.selectModal(key, props)}
          />
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <div id="App">
        {this.getCurrentPageWidget()}
        <Modal currentModal={this.state.currentModal} />
      </div>
    );
  }
}

export default App;
