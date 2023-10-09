const count = 0;
export default function reducer(state = count, action) {
  const { type, payload } = action;
  switch (type) {
    case "INCREMENT":
      return state + payload;
    case "DECREMENT":
      return state - payload;
    default:
      return state;
  }
}
