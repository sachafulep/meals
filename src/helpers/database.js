import db from "../helpers/firebase";
import { v4 as uuid } from "uuid";
import firebase from "firebase/app";

class Database {
  static insertHousehold(name, onSuccesCallback) {
    const id = uuid();

    db.collection("households")
      .doc(id)
      .set({
        uuid: id,
        name: name,
      })
      .then(function () {
        const user = firebase.auth().currentUser;

        const householdRef = db.collection("households").doc(id);

        householdRef
          .collection("members")
          .doc(user.uid)
          .set({ uuid: user.uid, name: user.displayName })
          .then(() => {
            householdRef.get().then((doc) => {
              onSuccesCallback(doc.data());
            });
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
}

export default Database;
