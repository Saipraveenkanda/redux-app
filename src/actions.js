export const IncAction = (value) => async (dispatch) => {
  dispatch({
    type: "INCREMENT",
    payload: value,
  });
};

export const DecAction = (value) => async (dispatch) => {
  dispatch({
    type: "DECREMENT",
    payload: value,
  });
};
