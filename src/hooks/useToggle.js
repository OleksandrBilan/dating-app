import { useReducer } from "react";

const Types = {
  SET: "SET",
  TOGGLE: "TOGGLE",
  OFF: "OFF",
  ON: "ON",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Types.SET:
      return !!action.value;
    case Types.TOGGLE:
      return !state;
    case Types.ON:
      return true;
    case Types.OFF:
      return false;

    default:
      return state;
  }
};

const useToggle = (initial = false) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return {
    value: state,
    set: (value) => dispatch({ type: Types.SET, value }),
    toggle: () => dispatch({ type: Types.TOGGLE }),
    on: () => dispatch({ type: Types.ON }),
    off: () => dispatch({ type: Types.OFF }),
  };
};

export default useToggle;
