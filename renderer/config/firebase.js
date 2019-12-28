import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { firebaseConfig } from "./constants";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.user = {};
    app
      .firestore()
      .enablePersistence()
      .catch(function (err) {
        if (err.code === "failed-precondition") {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
    // Subsequent queries will use persistence, if it was enabled successfully
  }
  login(e, p) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(e, p)
        .then(user => {
          resolve(user);
        })
        .catch(e => reject(e));
    });
  }
  signOut() {
    return this.auth.signOut();
  }

}

export default new Firebase();