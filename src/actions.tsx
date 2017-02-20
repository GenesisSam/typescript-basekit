import { Dispatch } from "redux";
import * as Firebase from "firebase";

export const ACTION_TYPES = {
  FIREBASE_SIGN_IN: "FIREBASE_SIGN_IN",
  FIREBASE_SIGN_OUT: "FIREBASE_SIGN_OUT",
  FIREBASE_IS_SIGN_IN: "FIREBASE_IS_SIGN_IN",

  FETCHING_DATA: "BEGIN_FETCHING_DATA",
  FETCHED_DATA: "END_FETCHING_DATA",
};

export function userAlreadySignIn(dispach: Dispatch<any>) {
  let userData: any;
  dispach(beginFetchingData());

  const user = Firebase.auth().currentUser;
  if (!user) {
    return {
      type: ACTION_TYPES.FIREBASE_SIGN_OUT,
    };
  }

  const uid = user.uid;

  const userInfoRef = Firebase.database().ref().child("users").child(uid);
  userInfoRef.on("value", (snap) => {
    const data = snap.val();
    userData = {
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
    };
  });

  dispach(endFetchingData());

  return {
    type: ACTION_TYPES.FIREBASE_IS_SIGN_IN,
    payload: userData,
  };
}

export function userSignIn(userEmail: string, password: string) {
  return (dispach: Dispatch<any>) => {
    let userData: any;
    dispach(beginFetchingData());

    Firebase.auth().signInWithEmailAndPassword(userEmail, password).then((res) => {
      const uid = res.uid;
      const userInfoRef = Firebase.database().ref().child("users").child(uid);

      userInfoRef.on("value", (snap) => {
        try {
          const data = snap.val();
          userData = {
            displayName: data.displayName,
            email: data.email,
            photoURL: data.photoURL,
          };

          return {
            type: ACTION_TYPES.FIREBASE_SIGN_IN,
            payload: userData,
          };
        } catch (err) {
          console.log(err);
        } finally {
          dispach(endFetchingData());
        }
      });
    });
  };
}

export function userSignOut(dispach: Dispatch<any>) {

  dispach(beginFetchingData());


  Firebase.auth().signOut();

  dispach(endFetchingData());
  return {
    type: ACTION_TYPES.FIREBASE_SIGN_OUT,
  };
}

export function beginFetchingData() {
  return {
    type: ACTION_TYPES.FETCHING_DATA,
  };
}

export function endFetchingData() {
  return {
    type: ACTION_TYPES.FETCHED_DATA,
  };
}
