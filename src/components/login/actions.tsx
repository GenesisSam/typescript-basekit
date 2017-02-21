import { Dispatch } from "redux";
import * as Firebase from "firebase";
import { IUserInformation } from "./reducer";

export const ACTION_TYPES = {
  FIREBASE_SIGN_IN: "FIREBASE_SIGN_IN",
  FIREBASE_SIGN_OUT: "FIREBASE_SIGN_OUT",
  FIREBASE_SIGN_UP: "FIREBASE_SIGN_UP",
  FIREBASE_IS_SIGN_IN: "FIREBASE_IS_SIGN_IN",

  FETCHING_DATA: "BEGIN_FETCHING_DATA",
  FETCHED_DATA: "END_FETCHING_DATA",
};

export function userAlreadySignIn() {
  return (dispatch: Dispatch<any>) => {
    let userData: IUserInformation;
    dispatch(beginFetchingData());

    const user = Firebase.auth().currentUser;
    if (!user) {
      dispatch(endFetchingData());
      return;
    }

    const uid = user.uid;
    const userInfoRef = Firebase.database().ref().child("users").child(uid);
    userInfoRef.on("value", (snap) => {
      try {
        const data = snap.val();
        userData = {
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
        };

        dispatch({
          type: ACTION_TYPES.FIREBASE_IS_SIGN_IN,
          payload: userData,
        });

      } catch (err) {
        console.log(err);
      } finally {
        dispatch(endFetchingData());
      }
    });
  };
}

export function userSignUp(userEmail: string, password: string, photoURL?: string) {
  return (dispatch: Dispatch<any>) => {

    dispatch(beginFetchingData());

    Firebase.auth().createUserWithEmailAndPassword(userEmail, password).then((res) => {
      if (res && res.uid) {
        const userInfoRef = Firebase.database().ref().child("users").child(res.uid);
        const userData: IUserInformation = {
          displayName: res.providerData.displayName,
          email: res.providerData.email,
          photoURL,
        };
        userInfoRef.push(userData).then((res2) => {
          dispatch(endFetchingData());
        });
      }
    }).catch((err) => {
      console.log(err);
      dispatch(endFetchingData());
    });
  };
}

export function userSignIn(userEmail: string, password: string) {
  return (dispach: Dispatch<any>) => {
    let userData: IUserInformation;
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

          dispach({
            type: ACTION_TYPES.FIREBASE_SIGN_IN,
            payload: userData,
          });
        } catch (err) {
          console.log(err);
        } finally {
          dispach(endFetchingData());
        }
      });
    });
  };
}

export function userSignOut() {
  return (dispach: Dispatch<any>) => {
    dispach(beginFetchingData());

    Firebase.auth().signOut().then((res) => {
      try {
        dispach({
          type: ACTION_TYPES.FIREBASE_SIGN_OUT,
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispach(endFetchingData());
      }
    });
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
