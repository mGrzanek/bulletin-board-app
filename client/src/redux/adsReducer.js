import { API_URL } from "../../config";

// selectors
export const getAllAds = ({ads}) => ads;

// actions
const createActionName = actionName => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName("UPDATE_ADS");

// action creators
export const updateAds = payload => ({ type: UPDATE_ADS, payload});

export const fetchAds = () => {
    return(dispatch) => {
        try {
            fetch(`${API_URL}/api/ads`)
                .then(res => res.json())
                .then(ads => dispatch(updateAds(ads)));
        }
        catch(err){
            console.log(err);
        }
    }
}

// reducer
const adsReducer = (statePart = [], action) => {
    switch(action.type) {
        case UPDATE_ADS:
            return [...action.payload];
        default:
            return statePart;
    }
}

export default adsReducer;