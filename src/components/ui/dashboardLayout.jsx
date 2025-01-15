// src/components/dashboardLayout.js

'use client'
import React, { useState, useCallback } from "react";
import Image from 'next/image';
import { FaCamera,
  FaSignOutAlt
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatProfilePicPath } from "@/utils/pathFormatter";
import { updateProfileImage,
  logoutUser
 } from "@/reduxStore/actions/authActions";
 import { useRouter } from 'next/navigation';
import styles from "@/styles/uiStyle/dashboard.module.css";


// Define default image with proper path
const DEFAULT_IMAGE = '/uploads/dashboardDefault/drgnimages.jpeg';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  
  const router = useRouter();
  
  console.log('isAuthenticated:', isAuthenticated);
  console.log('Dashboard Render - Current User:', currentUser);

  const [profilePicture, setProfilePicture] = useState(() => {
    console.log('Initializing profile picture with:', currentUser?.profilePic || DEFAULT_IMAGE);
    return formatProfilePicPath(currentUser?.profilePic || DEFAULT_IMAGE);
  });
  
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadBorderColor, setUploadBorderColor] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const validateImage = (file) => {
    console.log('Validating image:', file.name, 'Size:', file.size, 'Type:', file.type);
    
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
    console.log('Starting image upload process');
    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('userId', currentUser._id);
  
    console.log('Token Here:', token);
    console.log('Sending upload request to server');
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
    console.log('Upload successful:', result);
    return result;
  }, [currentUser._id]); // Add necessary dependencies like currentUser._id
  
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    console.log('File selected:', file.name);
    setIsUploading(true);
    setUploadStatus("");
    setUploadBorderColor("");
  
    try {
      validateImage(file);
  
      // Create a temporary preview
      const previewUrl = URL.createObjectURL(file);
      console.log('Preview URL created:', previewUrl);
      setProfilePicture(previewUrl);
  
      const response = await uploadImage(file, currentUser.accessToken); // Now uses stable uploadImage
  
      // Update Redux store with the new image path
      console.log('Updating Redux store with:', response.profilePic);
      dispatch(updateProfileImage(response.profilePic));
  
      // Update local state with the saved image path
      const formattedPath = formatProfilePicPath(response.profilePic);
      console.log('Setting formatted profile picture path:', formattedPath);
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
    console.log('User logging out');
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
    <div className={styles.dashboardContainer}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageWrap}>
          <Image
            src={profilePicture}
            alt={`${currentUser.username}'s profile`}
            width={150}
            height={150}
            className={styles.profileImage}
            style={{
              border: uploadBorderColor ? `3px solid ${uploadBorderColor}` : '3px solid transparent',
              transition: 'border-color 0.3s ease'
            }}
            onError={handleImageError}
            priority
          />
          <label htmlFor="fileUpload" className={styles.cameraIcon}>
            <input
              type="file"
              id="fileUpload"
              hidden
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <FaCamera />
          </label>
        </div>
        <h2 className={styles.userName}>
          {`Hi ${currentUser.username}`}
        </h2>
        {uploadStatus && (
          <p className={`${styles.uploadStatus} ${
            uploadBorderColor === 'green' ? styles.success : styles.error
          }`}>
            {uploadStatus}
          </p>
        )}
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Dashboard;
