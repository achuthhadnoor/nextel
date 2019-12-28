import app from "firebase/app";
import "firebase/auth"; 
import { firebaseConfig } from "./constants";

class Firebase {
  constructor() {
   if(app.apps.length === 0){
      app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.user = {}; 
  }
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