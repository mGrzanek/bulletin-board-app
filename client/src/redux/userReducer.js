import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

export const getUser = ({ user }) => user;

const UPDATE_USER = "app/users/UPDATE_USER";
const LOG_OUT = "app/users/LOG_OUT";

export const updateUser = (payload) => ({ type: UPDATE_USER, payload });
export const logOut = () => ({ type: LOG_OUT });

export const fetchUser = () => {
  return async (dispatch) => {
    const cachedUser = localStorage.getItem("user");

    try {
      const res = await fetch(`${API_URL}/auth/user`, {
        credentials: "include",
        cache: "no-store"
      });
      if(res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(updateUser(data));
        dispatch(updateStatus(null));
      } else if (res.status === 401) {
        localStorage.removeItem("user");
        dispatch(updateUser(null));
        dispatch(updateStatus(null));
        return;
      } else dispatch(updateStatus("serverError"));
    } catch {
      dispatch(updateStatus("offline"));
      if (cachedUser) {
        dispatch(updateUser(JSON.parse(cachedUser)));
      } else {
        dispatch(updateUser(null));
      }
    }
  };
};

const userReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    case LOG_OUT:
      localStorage.removeItem("user");
      return null;
    default:
      return statePart;
  }
};

export default userReducer;
