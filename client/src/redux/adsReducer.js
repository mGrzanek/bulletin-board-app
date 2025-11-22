import { API_URL, IMG_URL } from "../config";
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
  return async (dispatch) => {
    const cached = localStorage.getItem("ads");

    try {
      const res = await fetch(`${API_URL}/api/ads`);
      if (!res.ok) throw new Error("Offline or server error");
      const data = await res.json();

      const normalizedAds = data.map(ad => ({
        ...ad,
        image: ad.image ? `${IMG_URL}/${ad.image}` : "/images/attention.jpg",
        author: ad.author
          ? { ...ad.author, avatar: ad.author.avatar?.startsWith("http") ? ad.author.avatar : `${IMG_URL}/${ad.author.avatar}` }
          : null,
      }));

      localStorage.setItem("ads", JSON.stringify(normalizedAds));
      dispatch(updateAds(normalizedAds));
      dispatch(updateStatus(null));
    } catch {
      dispatch(updateStatus("offline"));
      if (cached) dispatch(updateAds(JSON.parse(cached)));
      else dispatch(updateAds([]));
    }
  };
};

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