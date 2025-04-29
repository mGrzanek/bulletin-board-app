// selectors
export const getStatus = ({status}) => status;

// actions
const createActionName = actionName => `app/requests/${actionName}`;
const UPDATE_STATUS = createActionName("UPDATE_STATUS");

// action creators
export const updateStatus = payload => ({ type: UPDATE_STATUS, payload });

// reducer
const statusReducer = (statePart = [], action) => {
    switch(action.type) {
        case UPDATE_STATUS:
            return action.payload;
        default:
            return statePart;
    }
}

export default statusReducer;