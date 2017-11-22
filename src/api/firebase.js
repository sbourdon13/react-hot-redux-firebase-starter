import * as firebase from 'firebase/firebase-browser';
import { firebaseConfig } from '../config';


class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {
    return firebase
      .database()
      .ref(path)
      .set(value);

  }

  static getRef(path) {
    return firebase
      .database()
      .ref(path);
  }

  static createKey(path) {
    return firebase
      .database()
      .ref(path)
      .push()
      .key;
  }

  static getLast10Children(path) {
    return firebase
      .database()
      .ref(path)
      .limitToLast(10)
      .once('value');
  }

  static getChildrenStartAtKey(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .startAt(key)
      .once('value');
  }


}

export default FirebaseApi;
