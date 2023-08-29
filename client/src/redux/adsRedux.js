import { API_URL } from '../config';
import axios from 'axios';
// selectors
export const getAllAds = ({ ads }) => ads.ads;
export const getAdById = ({ ads }, id) => ads.ads.find((ad) => ad._id === id);
export const getRequest = ({ ads }) => ads.request;
export const getAdBySearch = ({ ads }, search) =>
  ads.ads.filter((ad) => ad.title.toLowerCase().includes(search.toLowerCase()));

// actions
const createActionName = (name, reducerName) => `app/ads/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({
  type: EDIT_AD,
  payload,
});

// thunks
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error.message));
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.post(`${API_URL}/api/ads`, ad);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(addAd(res));
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error.message));
    }
  };
};

export const editAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.put(`${API_URL}/api/ads/${ad._id}`, ad);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(editAd(res));
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error.message));
    }
  };
};

const initialState = {
  ads: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

// reudcer
const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case ADD_AD:
      return { ...statePart, ads: [...statePart.ads, { ...action.payload }] };
    case EDIT_AD:
      return statePart.ads.map((ad) =>
        ad._id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case LOAD_ADS:
      return { ...statePart, ads: [...action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: false },
      };

    default:
      return statePart;
  }
};
export default adsReducer;
