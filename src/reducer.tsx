import { ACTION_TYPES } from "./actions";

export interface IUserState {
  meta: {
    isLoading: boolean;
    isDone: boolean;
  };
  currentUser: {
    displayName: string;
    email: string;
    photoURL: string;
  };
}

const initialUserState = {
  meta: {
    isLoading: false,
    isDone: false,
  },
  currentUser: {
    displayName: "",
    email: "",
    photoURL: "",
  },
};

export default function reducerUser(state = initialUserState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.FIREBASE_SIGN_IN:
      return Object.assign({}, state, {
        currentUser: action.payload,
      });
    case ACTION_TYPES.FETCHING_DATA:
      return Object.assign({}, state, {
        meta: {
          isLoading: true,
          isDone: false,
        },
      });
    case ACTION_TYPES.FETCHED_DATA:
      return Object.assign({}, state, {
        meta: {
          isLoading: false,
          isDone: true,
        }, currentUser: state.currentUser,
      });
    case ACTION_TYPES.FIREBASE_SIGN_OUT:
      return state;
    default:
      return state;
  }
}
