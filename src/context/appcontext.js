import { createContext } from "react";

// 1. --- Reducer és kezdeti állapot ---
export const initialState = {};

export function reducer(state, action) {
  switch (action.type) {
    case "TESZT":
      console.log("hello");
      return { ...state };

    default:
      return state;
  }
}

export const AppContext = createContext();
