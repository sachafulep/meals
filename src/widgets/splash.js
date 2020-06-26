import React from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase/app";
import "firebase/auth";
import Database from "../helpers/database";
import constants from "../helpers/constants";

const screens = constants.get("screens");

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setAuthentication(props.selectScreenCallback);
  }

  setAuthentication(selectScreenCallback) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        Database.login(
          user.uid,
          user.displayName,
          () => selectScreenCallback(screens.selectHousehold)
        );
      } else {
        this.ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: function () {
              return false;
            },
            uiShown: function () {
              document.getElementById("loader").style.display = "none";
            },
          },
          signInFlow: "popup",
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        };

        this.ui.start("#firebaseui-auth-container", uiConfig);
      }
    });
  }

  render() {
    return (
      <div id="SplashDiv">
        <h1>Meals</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Splash;
