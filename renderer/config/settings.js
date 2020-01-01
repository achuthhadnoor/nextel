"use strict";
// // Services
import firebase from './firebase'
const { getUser, updateUser } = require("./localstorage");
const notify = require("./notify");

export const exportUser = () => {
    const {user} = getUser();
   const _db = firebase.db;
    const UserRef = _db.ref('users/'+ user.uid);
    console.log(UserRef); 
    UserRef.set(user);
    
};

export const importUser = () => {
    debugger
    const {user} = getUser();
    const _db = firebase.db;u
        var userId = user.uid;
        var userRef = this.db.ref("users/" + userId)
            this.db.ref(userRef).once('value').then((snap)=>{
                   var  {user} = getUser();
                   user.uid = userId;
                   user = snap.val() && snap.val().uid ? snap.val() : user;
                   updateUser(user);
                   resolve(user);
            });
};

export const clearHistory = () => {
    const {user} = getUser();
    user.snips = [];
    updateUser(user);
};