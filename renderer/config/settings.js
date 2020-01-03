"use strict";
// // Services
import firebase from './firebase'
import isElectron from 'is-electron';
const remote = window.remote;
const writeJSON = window.writeJSON;
const readJson = window.readJson;
const { homedir } = window
const { getUser, updateUser } = require("./localstorage");
const notify = require("./notify");
export const exportUser = () => {
    const { user } = getUser();
    const _db = firebase.db;
    const UserRef = _db.ref('users/' + user.uid);
    UserRef.set(user);

};

const sync = () => {
    const _db = firebase.db;
    var userId = user.uid;
    var userRef = this.db.ref("users/" + userId)
    this.db.ref(userRef).once('value').then((snap) => {
        var { user } = getUser();
        userId = user.uid;

        user = snap.val() && snap.val().uid ? snap.val() : user;
        updateUser(user);
        resolve(user);
    });
}

export const importUser = () => {
    if (isElectron) { 
        remote.dialog.showOpenDialog(
            undefined,
            { properties: ["openFile"] },
            filePath => {
                readJson(filePath[0])
                    .then(({ user }) => {
                        if (user) {
                            return updateUser(user);
                        }
                    })
                    .then(() =>
                        notify({
                            title: "User config imported!",
                            body: "Your user config was imported successfully"
                        })
                    )
                    .catch(err => {
                        console.log(err);
                        return notify({
                            title: "Error!",
                            body: "Oops, something happened! Please, try again."
                        });
                    });
            }
        );
    }
    const { user } = getUser();
    const _db = firebase.db;
    var userId = user.uid;
    var userRef = this.db.ref("users/" + userId)
    this.db.ref(userRef).once('value').then((snap) => {
        var { user } = getUser();
        user.uid = userId;
        user = snap.val() && snap.val().uid ? snap.val() : user;
        updateUser(user);
        resolve(user);
    });
};

export const clearHistory = () => {
    const { user } = getUser();
    user.snips = [];
    updateUser(user);
};

export const exportUser1 = () => {
    remote.dialog.showSaveDialog(
        undefined,
        { defaultPath: `${homedir()}/snip.json` },
        fileName => {
            if (fileName) {
                const user = getUser();

                writeJSON(fileName, user)
                    .then(() =>
                        notify({
                            title: "User config exported!",
                            body: "Your user config was exported successfully"
                        })
                    )
                    .catch(err => {
                        console.log(err);
                        return notify({
                            title: "Error!",
                            body: "Oops, something happened! Please, try again."
                        });
                    });
            }
        }
    );
};

export const importUser1 = () => {
    remote.dialog.showOpenDialog(
        undefined,
        { properties: ["openFile"] },
        filePath => {
            readJson(filePath[0])
                .then(({ user }) => {
                    if (user) {
                        return updateUser(user);
                    }
                })
                .then(() =>
                    notify({
                        title: "User config imported!",
                        body: "Your user config was imported successfully"
                    })
                )
                .catch(err => {
                    console.log(err);
                    return notify({
                        title: "Error!",
                        body: "Oops, something happened! Please, try again."
                    });
                });
        }
    );
};
