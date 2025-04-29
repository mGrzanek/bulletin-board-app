import { API_URL } from "../config"

// selectors
export const getUser = ({user}) => user;

// actions
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const UPDATE_USER = createActionName("UPDATE_USER");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
export const logIn = payload => ({ type: LOG_IN, payload });
export const updateUser = payload => ({ type: UPDATE_USER, payload });
export const logOut = payload => ({ type: LOG_OUT, payload });

export const fetchUser = () => {
    return (dispatch) => {
        fetch(`${API_URL}/auth/user`, {
            credentials: "include"
          })
            .then(res => res.json())
            .then(user => {
                if (user._id && user.login) {
                    dispatch(updateUser(user));
                } else return null;
            })
            .catch(err => {
                console.log(err);
            });
    };
}

// reducer
const userReducer = (statePart = [], action) => {
    switch(action.type) {
        case LOG_IN:
            return action.payload;
        case UPDATE_USER:
            return action.payload;
        case LOG_OUT:
            return null;
        default:
            return statePart;
    }
}

export default userReducer;