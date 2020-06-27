import db from "../helpers/firebase";
import { v4 as uuid } from "uuid";
import firebase from "firebase/app";

class Database {
  static login(uuid, name, onSucces) {
    db.collection("users")
      .doc(uuid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          onSucces();
        } else {
          const user = { uuid: uuid, name: name };
          db.collection("users").doc(uuid).set(user).then(onSucces);
        }
      });
  }

  static async insertHousehold(name, onSucces) {
    const user = firebase.auth().currentUser;

    db.collection("households")
      .where("name", "==", name)
      .where("members", "array-contains", user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.size === 0) {
          const id = uuid();
          const user = firebase.auth().currentUser;
          const household = {
            uuid: id,
            name: name,
            members: [user.uid],
          };

          db.collection("households")
            .doc(id)
            .set(household)
            .then(onSucces(household))
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        }
      });
  }

  static selectHousehold(name, onSucces) {
    const user = firebase.auth().currentUser;

    db.collection("households")
      .where("name", "==", name)
      .where("members", "array-contains", user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.size !== 0) {
          snapshot.forEach((doc) => onSucces(doc.data()));
        }
      });
  }

  static insertMeal(name, household, context) {
    const id = uuid();
    const meal = { id: id, name: name, lastEaten: Date.now() };

    db.collection("households")
      .doc(household.uuid)
      .collection("meals")
      .doc(id)
      .set(meal)
      .then(() => {
        context.state.meals.set(id, meal);
        context.setState({});
      });
  }

  static getMeals(household, context) {
    const meals = new Map();

    db.collection("households")
      .doc(household.uuid)
      .collection("meals")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          meals.set(doc.data().id, doc.data());
        });

        context.setState({ meals: meals });
      });
  }
}

export default Database;
