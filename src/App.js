import React from "react";
import "./App.css";
import Splash from "./widgets/splash";
import CreateHousehold from "./widgets/createHousehold";

const screens = { splash: 1, createHousehold: 2 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: screens.splash,
    };

    // db.collection("cool")
    //   .doc("nice")
    //   .set({
    //     name: "yes",
    //     state: "fdsa",
    //     country: "fdsafdsafdsa",
    //   })
    //   .then(function () {
    //     console.log("Document successfully written!");
    //   })
    //   .catch(function (error) {
    //     console.error("Error writing document: ", error);
    //   });
  }

  selectScreen(screen) {
    this.setState({ currentScreen: screen });
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

      case screens.createHousehold:
        return (
          <div>
            <CreateHousehold />
          </div>
        );

      default:
        return null;
    }
  }
}

export default App;
