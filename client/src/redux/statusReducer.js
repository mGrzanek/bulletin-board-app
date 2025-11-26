import initialState from "./initialState";

// selectors
export const getStatus = ({ status }) => status;

// action types
const UPDATE_STATUS = "app/status/UPDATE_STATUS";

// action creators
export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload });

// reducer
const statusReducer = (statePart = initialState.status, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      if (action.payload === "offline") {
        localStorage.setItem("status", action.payload);
      } else {
        localStorage.removeItem("status");
      }
      return action.payload;
    default:
      return statePart;
  }
};

export default statusReducer;
