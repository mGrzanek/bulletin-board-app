import { API_URL } from "../config"

// selectors
export const getUser = ({user}) => user;

// actions
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const UPDATE_USER = createActionName("UPDATE_USER");

// action creators
export const logIn = payload => ({ type: LOG_IN, payload });
export const updateUser = payload => ({ type: UPDATE_USER, payload });

export const fetchUser = () => {
    return(dispatch) => {
        try {
            fetch(`${API_URL}/auth/user`)
                .then(res => res.json())
                .then(user => dispatch(updateUser(user.login, user.id)));
        } 
        catch(err){
            console.log(err)
        }
    }
}

// reducer
const userReducer = (statePart = [], action) => {
    switch(action.type) {
        case LOG_IN:
            return action.payload;
        case UPDATE_USER:
            return action.payload;
        default:
            return statePart;
    }
}

export default userReducer;