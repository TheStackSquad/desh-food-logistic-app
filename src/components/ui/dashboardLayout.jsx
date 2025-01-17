// src/components/dashboardLayout.js

'use client'
import React, { useState, useCallback } from "react";
import Image from 'next/image';
import { Camera, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { formatProfilePicPath } from "@/utils/pathFormatter";
import { updateProfileImage,
  logoutUser
 } from "@/reduxStore/actions/authActions";
 import { useRouter } from 'next/navigation';


// Define default image with proper path
const DEFAULT_IMAGE = '/uploads/dashboardDefault/drgnimages.jpeg';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
const currentUser = useSelector((state) => state.auth?.user || {});

  
  const router = useRouter();
  
//  console.log('isAuthenticated:', isAuthenticated);
//  console.log('Dashboard Render - Current User:', currentUser);

  const [profilePicture, setProfilePicture] = useState(() => {
  //  console.log('Initializing profile picture with:', currentUser?.profilePic || DEFAULT_IMAGE);
    return formatProfilePicPath(currentUser?.profilePic || DEFAULT_IMAGE);
  });
  
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadBorderColor, setUploadBorderColor] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const validateImage = (file) => {
  //  console.log('Validating image:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be less than 5MB");
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, JPG, PNG, and WEBP images are allowed");
    }

    return true;
  };
  //const token = currentUser.accessToken;

  const uploadImage = useCallback(async (file, token) => {
  //  console.log('Starting image upload process');
    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('userId', currentUser._id);
  
  //  console.log('Token Here:', token);
  //  console.log('Sending upload request to server');
    const response = await fetch('/api/dashboard', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error('Upload failed:', error);
      throw new Error(error.message || 'Failed to upload image');
    }
  
    const result = await response.json();
  //  console.log('Upload successful:', result);
    return result;
  }, [currentUser._id]); // Add necessary dependencies like currentUser._id
  
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
  //  console.log('File selected:', file.name);
    setIsUploading(true);
    setUploadStatus("");
    setUploadBorderColor("");
  
    try {
      validateImage(file);
  
      // Create a temporary preview
      const previewUrl = URL.createObjectURL(file);
  //    console.log('Preview URL created:', previewUrl);
      setProfilePicture(previewUrl);
  
      const response = await uploadImage(file, currentUser.accessToken); // Now uses stable uploadImage
  
      // Update Redux store with the new image path
  //    console.log('Updating Redux store with:', response.profilePic);
      dispatch(updateProfileImage(response.profilePic));
  
      // Update local state with the saved image path
      const formattedPath = formatProfilePicPath(response.profilePic);
  //    console.log('Setting formatted profile picture path:', formattedPath);
      setProfilePicture(formattedPath);
  
      setUploadStatus("Image uploaded successfully!");
      setUploadBorderColor("green");
    } catch (error) {
      console.error('Upload process failed:', error);
      setProfilePicture(formatProfilePicPath(currentUser?.profilePic || DEFAULT_IMAGE));
      setUploadStatus(error.message || "Upload failed. Please try again.");
      setUploadBorderColor("red");
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadStatus("");
        setUploadBorderColor("");
      }, 3000);
    }
  }, [dispatch, currentUser, uploadImage]); // uploadImage is now stable
  

  const handleImageError = useCallback(() => {
    console.error("Image load failed, using default image");
    setProfilePicture(DEFAULT_IMAGE);
  }, []);
  // Handlers
  const handleLogout = useCallback(() => {
//    console.log('User logging out');
    ["user", "persist:user"].forEach((key) => localStorage.removeItem(key));
    dispatch(logoutUser());
    window.location.href = "/Login";
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Dev - Kitchen</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <button
            onClick={() => router.push('/Login')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            Login Now
          </button>
        </div>
      </div>
      
    );
  }
  // Modified Image component with proper error handling
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    {/* Profile Section */}
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <Image
          src={profilePicture}
          alt={`${currentUser.username}'s profile`}
          width={150}
          height={150}
          className={`rounded-full border-4 transition-colors ${uploadBorderColor ? `border-${uploadBorderColor}` : 'border-transparent'}`}
          onError={handleImageError}
          priority
        />
        <label htmlFor="fileUpload" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
          <input
            type="file"
            id="fileUpload"
            hidden
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Camera className="text-gray-600" />
        </label>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        {`Hi, ${currentUser.username}`}
      </h2>
      {uploadStatus && (
        <p className={`mt-2 text-sm font-medium ${uploadBorderColor === 'green' ? 'text-green-600' : 'text-red-600'}`}>
          {uploadStatus}
        </p>
      )}
    </div>

    {/* Logout Button */}
    <div className="text-center">
      <button
        onClick={handleLogout}
        className="flex items-center justify-center px-4 py-2 bg-red-500 text-white font-semibold rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        <LogOut className="mr-2" /> Logout
      </button>
    </div>
  </div>
  );
};

export default Dashboard;
