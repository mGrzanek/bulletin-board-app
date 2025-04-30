import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors
export const getAllAds = ({ads}) => ads;
export const getAdById = ({ads}, adId) => ads.find(ad => ad._id === adId);

// actions
const createActionName = actionName => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName("UPDATE_ADS");
const ADD_AD = createActionName("ADD_AD");
const EDIT_AD = createActionName("EDIT_AD");
const REMOVE_AD = createActionName("REMOVE_AD");

// action creators
export const updateAds = payload => ({ type: UPDATE_ADS, payload});
export const addAd = payload => ({ type: ADD_AD, payload });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

export const fetchAds = () => {
  return(dispatch) => {
    try {
      dispatch(updateStatus("loading"));
      fetch(`${API_URL}/api/ads`)
        .then(res => res.json())
        .then(ads => {
          dispatch(updateAds(Array.isArray(ads) ? ads : []));
          dispatch(updateStatus(null));
        })
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
      dispatch(updateStatus("loading"));
      const res = await fetch(`${API_URL}/api/ads`, options);
      const data = await res.json(); 
      if (res.status === 200) {
          const ad = data.message;
          dispatch(addAd(ad));
          dispatch(updateStatus("success"));
          return res;
      } else if(res.status === 400) {
        dispatch(updateStatus("clientError"));
        return res;
      }
      else {
        dispatch(updateStatus("serverError"));
        return res;
      }
    } catch (err) {
      console.error({ message: err });
      dispatch(updateStatus("serverError"));
      return 500;
    }
  };
};

export const editAdRequest  = (editedAd, id) => {
  return async (dispatch) => {
    const options = {
      method: "PUT",
      body: editedAd,
      credentials: "include"
    };

    try {
      dispatch(updateStatus("loading"));
      const res = await fetch(`${API_URL}/api/ads/${id}`, options);
      if(res.status === 200){
        const data = await res.json();
        const ad = data.message;
        dispatch(editAd(ad));
        dispatch(updateStatus("success"));
        return res.status;
      } else if(res.status === 400) {
        dispatch(updateStatus("clientError")); 
        return res.status;
      } 
      else if(res.status === 404) {
        dispatch(updateStatus("clientError"));
        return res.status;
      } 
      else {
        dispatch(updateStatus("serverError"));
        return res.status;
      }
    } catch (err) {
      console.error({ message: err });
      dispatch(updateStatus("serverError"));
      return 500;
    }
  }
}

export const removeAdRequest = (adToRemoveId) => {
  return async (dispatch) => { 
    const options = {
      method: "DELETE",
      credentials: "include"
    };

    try {
      dispatch(updateStatus("loading"));
      const res = await fetch(`${API_URL}/api/ads/${adToRemoveId}`, options);
      if(res.status === 200){
        dispatch(removeAd(adToRemoveId));
        dispatch(updateStatus("success"));
      } else if (res.status === 404) {
        dispatch(updateStatus("clientError"));
        return res.status;
      }
      else {
        dispatch(updateStatus("serverError"));
        return res.status;
      }
    }
    catch(err) {
      console.error({ message: err });
      dispatch(updateStatus("serverError"));
      return 500;
    }
  }
}
  
// reducer
const adsReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    case ADD_AD:
      return [ ...statePart, { ...action.payload}];
    case EDIT_AD:
      return statePart.map(ad => ad._id === action.payload._id ? {...ad, ...action.payload} : ad);
    case REMOVE_AD:
      return statePart.filter(ad => ad._id !== action.payload);
    default:
      return statePart;
  }
}

export default adsReducer;