import React from "react";
import "./App.css";
import Splash from "./widgets/splash";
import SelectHousehold from "./widgets/selectHousehold";
import CreateHousehold from "./widgets/createHousehold";
import Home from "./widgets/home";
import constants from "./helpers/constants";

const screens = constants.get("screens");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: screens.splash,
      currentHousehold: undefined,
    };
  }

  selectScreen(screen) {
    this.setState({ currentScreen: screen });
  }

  selectHousehold(household) {
    this.setState({ currentHousehold: household });
    this.selectScreen(screens.home);
  }

  render() {
    switch (this.state.currentScreen) {
      case screens.splash:
        return (
          <div>
            <Splash
              selectScreenCallback={(screen) => this.selectScreen(screen)}
            />
          </div>
        );

      case screens.selectHousehold:
        return (
          <div>
            <SelectHousehold
              selectScreenCallback={(screen) => this.selectScreen(screen)}
              selectHouseholdCallback={(household) =>
                this.selectHousehold(household)
              }
            />
          </div>
        );

      case screens.createHousehold:
        return (
          <div>
            <CreateHousehold
              selectHouseholdCallback={(household) =>
                this.selectHousehold(household)
              }
            />
          </div>
        );

      case screens.home:
        return (
          <div>
            <Home currentHousehold={this.state.currentHousehold} />
          </div>
        );

      default:
        return null;
    }
  }
}

export default App;
