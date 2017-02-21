import { ACTION_TYPES } from "./actions";

export interface IAccount {
  bankType: string;
  accountNumber: string;
  displayName: string;
  extraData: string;
}

export interface IWalletState {
  meta: {
    isLoading: boolean;
    isDone: boolean;
    isFailed: boolean;
    errorMessage: any;
  };
  accounts: IAccount[];
}

const initialWalletState: IWalletState = {
  meta: {
    isLoading: false,
    isDone: false,
    isFailed: false,
    errorMessage: "",
  },
  accounts: [],
};

export default function reducerWallet(state = initialWalletState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_ACCOUNTS:
      return Object.assign({}, state, {
        accounts: action.payload,
      });

    case ACTION_TYPES.START_FETCH_ACCOUNT:
      return Object.assign({}, state, {
        meta: {
          isLoading: true,
          isDone: false,
          isFailed: false,
          errorMessage: "",
        },
      });
    case ACTION_TYPES.ERROR_FETCH_ACCOUNT:
      return Object.assign({}, state, {
        meta: {
          isLoading: false,
          isDone: false,
          isFailed: true,
          errorMessage: action.message,
        },
      });
    case ACTION_TYPES.END_FETCH_ACCOUNT:
      return Object.assign({}, state, {
        meta: {
          isLoading: false,
          isDone: true,
          isFailed: false,
          errorMessage: "",
        },
      });
    default:
      return state;
  }
}
