//src/utils/pathFormatter.js
export const formatProfilePicPath = (rawPathForUserPix) => {
  const DEFAULT_IMAGE = '/uploads/dashboardDefault/drgnimages.jpeg';

//  console.log('formatProfilePicPath input:', rawPathForUserPix);

  if (!rawPathForUserPix) {
  //  console.log('No path provided, using default:', DEFAULT_IMAGE);
    return DEFAULT_IMAGE;
  }

  if (rawPathForUserPix.startsWith('http') || rawPathForUserPix.startsWith('/')) {
  //  console.log('Path is already properly formatted:', rawPathForUserPix);
    return rawPathForUserPix;
  }

  const formattedPath = `/${rawPathForUserPix.replace(/\\/g, '/')}`;
//  console.log('Formatted path:', formattedPath);
  return formattedPath;
};

export const formatProfilePicPathVendor = (rawPathForVendorProfile) => {
  const DEFAULT_IMAGE = '/uploads/dashboardDefault/drgnimages.jpeg';

  // If no path is provided, use the default image
  if (!rawPathForVendorProfile) {
    return DEFAULT_IMAGE;
  }

  // If the path is already a full URL or starts with a slash, return it as is
  if (
    rawPathForVendorProfile.startsWith('http') || 
    rawPathForVendorProfile.startsWith('/')
  ) {
    return rawPathForVendorProfile;
  }

  // Otherwise, ensure the path starts with a forward slash and format it
  const formattedPath = `/${rawPathForVendorProfile.replace(/\\/g, '/')}`;
  return formattedPath;
};


      
  export const formatImagePath = (rawPathForMenuCards) => {
    const BASE_URL = "http://localhost:5000"; // Backend URL
    const DEFAULT_IMAGE = `${BASE_URL}/uploads/default-image-placeholder.webp`;
  
  //  console.log("Raw Path Received For VendorAddMenu:", rawPathForMenuCards);
    if (!rawPathForMenuCards) {
    //  console.log("Returning Default Image: ", DEFAULT_IMAGE);
      return DEFAULT_IMAGE;
    }
  
    // Normalize slashes and prepend the full backend URL
    const normalizedPath = rawPathForMenuCards.replace(/\\/g, "/");
   // console.log("Normalized Path Received For VendorAddMenu:", normalizedPath);
  
    // Handle vendorAddMenu-specific formatting or return normalized path
    if (normalizedPath.includes('/vendorAddMenu')) {
      const formattedPath = `${BASE_URL}/uploads/vendorAddMenu/${normalizedPath.split('/vendorAddMenu').pop()}`;
     // console.log("Vendor Profile Image Path:", formattedPath); // Log user profile image path
      return formattedPath;
    }
     // Default case for other image paths
     const finalPath = `${BASE_URL}/uploads/vendorAddMenu/${normalizedPath}`;
  //   console.log("Final Image Path:", finalPath); // Log the final image path
     return finalPath;
    }
