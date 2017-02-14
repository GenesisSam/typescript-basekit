export const ACTION_TYPES = {
  GET_DATA: "SEARCHBAR.GET_DATA",
  GET_DATA_KEYWORD: "SEARCHBAR.GET_DATA_KEYWORD",
  DONE_GET_DATA: "SEARCHBAR.DONE_GET_DATA",
  FAILED_GET_DATA: "SEARCHBAR.FAILED_GET_DATA",
};

export function getAllData() {
  return (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: ACTION_TYPES.GET_DATA });
  };
}

export function getDataByKeyword(keyword: string) {
  return {
    type: ACTION_TYPES.GET_DATA_KEYWORD,
    keyword,
  };
}

export function doneGetData() {
  return {
    type: ACTION_TYPES.DONE_GET_DATA,
  };
}

export function failedGetData() {
  return {
    type: ACTION_TYPES.FAILED_GET_DATA,
  };
}
