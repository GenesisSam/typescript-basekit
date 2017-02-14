import { ACTION_TYPES } from "./components/actions";

export interface InitialState {
  keyword: string;
  results: any[];
}

export function getAllData(state: InitialState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.GET_DATA: {
      return Object.assign({}, state, {
        results: action.result,
      });
    }
    default: {
      return state;
    }
  }
}
