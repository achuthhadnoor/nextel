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
    debugger
    UserRef.set(user);
    
};

export const importUser = () => {
    // remote.dialog.showOpenDialog(
    //     undefined,
    //     { properties: ["openFile"] },
    //     filePath => {
    //         readJson(filePath[0])
    //             .then(({ user }) => {
    //                 if (user) {
    //                     return updateUser(user);
    //                 }
    //             })
    //             .then(() =>
    //                 notify({
    //                     title: "User config imported!",
    //                     body: "Your user config was imported successfully"
    //                 })
    //             )
    //             .catch(err => {
    //                 console.log(err);
    //                 return notify({
    //                     title: "Error!",
    //                     body: "Oops, something happened! Please, try again."
    //                 });
    //             });
    //     }
    // ); 
};

export const clearHistory = () => {
    const user = {
        snips: []
    };

    updateUser(user);
};