import React from "react";
import Database from "../../helpers/database";
import constants from "../../helpers/constants";

const modals = constants.get("modals");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meals: undefined };

    this.submitMeal = this.submitMeal.bind(this);
    this.getMeals();
  }

  getMeals() {
    Database.getMeals(this.props.currentHousehold, this);
  }

  submitMeal() {
    const input = document.getElementById("InputMealName");
    const name = input.value;
    input.value = "";

    // this.props.selectModal(modals.insertMealModal, {name: name});

    Database.insertMeal(name, this.props.currentHousehold, this);
  }

  header() {
    return <h1>The {this.props.currentHousehold.name} household</h1>;
  }

  subHeader() {
    return <p>Add or select a meal.</p>;
  }

  inputDiv() {
    return (
      <div id="DivInputMeal">
        <input id="InputMealName" placeholder="Meal name"></input>
        <button onClick={this.submitMeal} id="ButtonSubmitMeal">
          Submit
        </button>
      </div>
    );
  }

  mealList() {
    if (this.state.meals !== undefined) {
      const mealItems = [];

      this.state.meals.forEach((value) => {
        mealItems.push(
          <li>
            <div className="DivMealItem">
              <div>{value.name}</div>
              <div>{this.getFormattedDate(value.lastEaten)}</div>
            </div>
          </li>
        );
      });

      return <ul>{mealItems}</ul>;
    }
  }

  getFormattedDate(timestamp) {
    const date = new Date(timestamp);

    const months = {
      0: "JANUARY",
      1: "FEBRUARY",
      2: "MARCH",
      3: "APRIL",
      4: "MAY",
      5: "JUNE",
      6: "JULY",
      7: "AUGUST",
      8: "SEPTEMBER",
      9: "OCTOBER",
      10: "NOVEMBER",
      11: "DECEMBER",
    };

    const currentDate = new Date(Date.now());

    const diffDays = (currentDate - date) / 1000 / 60 / 60 / 24;

    if (diffDays < 1) {
      if (currentDate.getDate() - date.getDate() === 1) {
        return "yesterday";
      } else {
        return "Today";
      }
    } else if (diffDays === 1) {
      return "yesterday";
    } else if (diffDays < 8) {
      let day;

      switch (date.getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          break;
      }

      return day;
    } else {
      return (
        months[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear()
      );
    }
  }

  render() {
    return (
      <div id="DivHome">
        {this.header()}
        {this.subHeader()}
        {this.inputDiv()}
        {this.mealList()}
      </div>
    );
  }
}

export default Home;
