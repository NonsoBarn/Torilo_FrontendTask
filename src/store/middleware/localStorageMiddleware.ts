// src/store/middleware/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";

// Save the state to local storage
export const saveStateMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    try {
      const serializedState = JSON.stringify(state.attendance);
      localStorage.setItem("attendanceState", serializedState);
    } catch (e) {
      console.error("Could not save state to local storage", e);
    }
    return result;
  };

// Loading state from local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("attendanceState");
    if (serializedState === null) {
      return undefined; // Let the reducer use its initial state
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from local storage", e);
    return undefined;
  }
};
