//src/reduxStore/actions/authActions.js
'use client';

import {
  LOGIN,
  LOGOUT,
 // SET_LOADING,
 UPDATE_PROFILE_IMAGE
} from '@/reduxStore/constants/actionTypes.js';


// Login action for users
export const loginUser = (userData) => ({
  type: LOGIN,
  payload: userData, // Send the entire userData object
});

// Logout action for users 
export const logoutUser = () => ({
  type: LOGOUT,
});

// Update profile image
export const updateProfileImage = (profilePic) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: { profilePic } // Ensure the payload contains profilePic
});

// Toggle recent item (handles both add and remove)
//eslint-disable-next-line
export const toggleRecent = (meal, isRemoving = false) => async (dispatch, getState) => {
 
};