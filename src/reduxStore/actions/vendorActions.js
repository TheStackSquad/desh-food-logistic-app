//src/reduxSore/actions/vendorActions.js
'use client';
import axios from 'axios';

import {
    VENDOR_LOGIN,
    VENDOR_LOGIN_SUCCESS,
    VENDOR_LOGIN_FAILURE,
    VENDOR_LOGOUT,
    VENDOR_ADD_MENU_ITEM,
    VENDOR_UPDATE_MENU_ITEM,
    VENDOR_REMOVE_MENU_ITEM,
    CLEAR_ERROR,
    UPDATE_VENDOR_PROFILE,
  } from '../constants/actionTypes';

  // Action to initiate the login process
export const loginVendorAction = (vendorData) => (dispatch) => {
    dispatch({ type: VENDOR_LOGIN });

    if (!vendorData || !vendorData.vendor) {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        payload: 'Invalid vendor data received'
      });
      return;
    }
    try {
      // Validate required fields for basic vendor data
      const requiredFields = ['vendor', 'accessToken', 'refreshToken'];
      const missingFields = requiredFields.filter(field => !vendorData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  
      // Profile data might be null initially, and that's okay
      const payload = {
        ...vendorData,
        vendor: {
          ...vendorData.vendor,
          profile: vendorData.vendor.profile || null
        }
      };
  
      dispatch({
        type: VENDOR_LOGIN_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        payload: error.message || 'Login failed'
      });
    }
  };
  
  // Action to log out vendor
  export const logoutVendor = () => (dispatch) => {
    // Clear token and any persisted data
    localStorage.removeItem('userData');
  
    // Dispatch actions for logout and session failure
    dispatch({ type: VENDOR_LOGOUT });
  };
  
  // Action to clear error messages
  export const clearError = () => ({
    type: CLEAR_ERROR,
  });

  // vendorActions for profile updates
export const updateVendorProfile = (profile) => {
  return {
    type: UPDATE_VENDOR_PROFILE,
    payload: profile
  };
}

export const addMenuItem = (menuItem) => async (dispatch, getState) => {
  try {
    // Extract vendor data from Redux state
    const { vendor } = getState();
    const vendorData = JSON.parse(vendor.vendorData);
    const { accessToken, vendor: { id } } = vendorData;

    console.log('Dispatching addMenuItem:', { menuItem, accessToken, id });

    // Make the API call
    const response = await axios.post('/api/add-menu', menuItem, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Dispatch the result to the reducer
    dispatch({
      type: VENDOR_ADD_MENU_ITEM,
      payload: response.data,
    });

    console.log('Successfully added menu item:', response.data);
  } catch (error) {
    console.error('Failed to add menu item:', error.response?.data || error.message);
  }
};


export const removeMenuItem = (menuItemId) => ({
  type: VENDOR_REMOVE_MENU_ITEM,
  payload: menuItemId,
});

// src/reduxStore/vendorActions.js
export const deleteMenuItem = (menuItemId, accessToken, vendorId) => async (dispatch) => {
  try {
    const response = await fetch('/api/add-menu', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        id: vendorId,
        accessToken: accessToken,
      },
      body: JSON.stringify({ menuItemId }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      dispatch(removeMenuItem(menuItemId));
      return { success: true };
    }
    return { success: false, error: data.error };
  } catch (error) {
    console.error('Delete menu item error:', error);
    return { success: false, error: error.message };
  }
};

export const updateMenuItem = (menuItemId, updates, accessToken, vendorId) => async (dispatch) => {
  try {
    const response = await fetch('/api/add-menu', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        id: vendorId,
        accessToken: accessToken,
      },
      body: JSON.stringify({ menuItemId, updates }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      dispatch({
        type: VENDOR_UPDATE_MENU_ITEM,
        payload: data.menuItem,
      });
      return { success: true, menuItem: data.menuItem };
    }
    return { success: false, error: data.error };
  } catch (error) {
    console.error('Update menu item error:', error);
    return { success: false, error: error.message };
  }
};