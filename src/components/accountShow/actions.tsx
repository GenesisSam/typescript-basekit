import * as Firebase from "firebase";
import { Dispatch } from "redux";

export const ACTION_TYPES = {
  FETCH_ALL_ACCOUNTS: "FETCH_ALL_ACCOUNTS",
  PUSH_NEW_ACCOUNT: "PUSH_NEW_ACCOUNT",
  PUSH_MODIFY_ACCOUNT: "PUSH_MODIFY_ACCOUNT",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
  FETCH_MORE_ACCOUNTS: "FETCH_MORE_ACCOUNTS",
  START_FETCH_ACCOUNT: "ACCOUNT_START_FETCH",
  ERROR_FETCH_ACCOUNT: "ACCOUNT_ERROR_FETCH",
  END_FETCH_ACCOUNT: "ACCOUNT_END_FETCH",
};

export function getAllAccounts() {
  return (dispatch: Dispatch<any>) => {
    const uid = Firebase.auth().currentUser.uid;
    const wallet = Firebase.database().ref().child("wallet").child(uid);
    const accounts = wallet.child("accounts");

    dispatch(startFetching());
    accounts.once("value").then((snap: Firebase.database.DataSnapshot) => {
      try {
        dispatch({
          type: ACTION_TYPES.FETCH_ALL_ACCOUNTS,
          payload: snap,
        });
      } catch (err) {
        console.log(err);
        dispatch(errorFetching(err));
      } finally {
        dispatch(endFetching());
      }
    }).catch((err: any) => {
      dispatch(errorFetching(err));
    });
  };
}


export function startFetching() {
  return {
    type: ACTION_TYPES.START_FETCH_ACCOUNT,
  };
}

export function errorFetching(message?: any) {
  return {
    type: ACTION_TYPES.ERROR_FETCH_ACCOUNT,
    message,
  };
}

export function endFetching() {
  return {
    type: ACTION_TYPES.END_FETCH_ACCOUNT,
  };
}
