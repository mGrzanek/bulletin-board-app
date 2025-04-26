import { API_URL } from "../config";

// selectors
export const getAllAds = ({ads}) => ads;
export const getAdById = ({ads}, adId) => ads.find(ad => ad._id === adId);

// actions
const createActionName = actionName => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName("UPDATE_ADS");
const ADD_AD = createActionName("ADD_AD");

// action creators
export const updateAds = payload => ({ type: UPDATE_ADS, payload});
export const addAd = payload => ({ type: ADD_AD, payload });

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

export const addAdRequest = (newAd) => {
    return async (dispatch) => {
      const options = {
        method: "POST",
        body: newAd,
        credentials: "include",
      };
  
      try {
        const res = await fetch(`${API_URL}/api/ads`, options);
        
        if (res.status === 200) {
            const data = await res.json();
            const ad = data.message;
            dispatch(addAd(ad));
            return "success";
        } else if (res.status === 400) {
          return "clientError";
        } else {
          return "serverError";
        }
  
      } catch (err) {
        console.error({ message: err });
        return "serverError";
      }
    };
  };
  
// reducer
const adsReducer = (statePart = [], action) => {
    switch(action.type) {
        case UPDATE_ADS:
            return [...action.payload];
        case ADD_AD:
            return [ ...statePart, { ...action.payload}];
        default:
            return statePart;
    }
}

export default adsReducer;