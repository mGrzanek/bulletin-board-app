import { API_URL } from "../config"

// selectors
export const getUser = ({user}) => user;

// actions
const createActionName = actionName => `app/users/${actionName}`;
const UPDATE_USER = createActionName("UPDATE_USER");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
export const updateUser = payload => ({ type: UPDATE_USER, payload });
export const logOut = payload => ({ type: LOG_OUT, payload });

export const fetchUser = () => {
  return (dispatch) => {
    try {
      fetch(`${API_URL}/auth/user`, { credentials: "include" })
        .then((res) => res.json())
        .then((user) => {
          if (user._id && user.login) {
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(updateUser(user));
          } else {
            dispatch(updateUser(null));
          }
        })
        .catch((err) => {
          console.warn("Offline - getting user from localStorage", err);
          const cachedUser = localStorage.getItem("user");
          if (cachedUser) {
            dispatch(updateUser(JSON.parse(cachedUser)));
          } else {
            dispatch(updateUser(null));
          }
        });
    } catch (err) {
      console.error("Unexpected fetchUser error:", err);
      dispatch(updateUser(null));
    }
  };
};


// reducer
const userReducer = (statePart = [], action) => {
    switch(action.type) {
        case UPDATE_USER:
            return action.payload;
        case LOG_OUT:
            return null;
        default:
            return statePart;
    }
}

export default userReducer;