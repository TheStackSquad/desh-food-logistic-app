"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Edit, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Redux Actions
import { logoutVendor, deleteMenuItem, updateMenuItem } from "@/reduxStore/actions/vendorActions";

// UI Components
import { DashboardCard, DashboardCardContent, DashboardWrap, Modal } from "@/components/ui/dashboardCard";

const DEFAULT_PROFILE_IMAGE = "/uploads/dashboardDefault/drgnimages.jpeg"; // Adjust path as needed

const VendorDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // State management
  const [activeCardId, setActiveCardId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    profile: {},
    mealsData: [],
  });

  // Redux state
  const vendorData = useSelector((state) => state.vendor.vendorData);
  const accessToken = vendorData?.accessToken;

  useEffect(() => {
    if (!vendorData) {
      console.log("No vendor data found");
      return;
    }

    try {
      const profile = vendorData?.sessionData?.profile || {};
      const mealsData = vendorData?.sessionData?.meals || [];
      setDashboardData({ profile, mealsData });
    } catch (error) {
      console.error("Error processing vendor data:", error);
    }
  }, [vendorData]);

  // Handlers
  const handleDeleteClick = (mealId) => {
    setActiveCardId(mealId);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const vendorId = vendorData?.sessionData?.vendor?._id;
      const result = await dispatch(deleteMenuItem(activeCardId, accessToken, vendorId));
      
      if (result.success) {
        setActiveCardId(null);
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (meal) => {
    router.push(`/vendor/editmenu/${meal._id}`);
  };

  const handleLogout = () => {
    dispatch(logoutVendor());
    router.push("/vendor/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={dashboardData.profile.profileImagePath || DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {dashboardData.profile.storeName || "Vendor Store"}
                </h2>
                <p className="text-sm text-gray-500">
                  {dashboardData.profile.storeDescription || "Your store description"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.mealsData.map((meal) => (
            <DashboardCard key={meal._id}>
              <div className="relative h-48 w-full">
                <Image
                  src={meal.image}
                  alt={meal.mealName}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              
              <DashboardCardContent>
                <h3 className="text-lg font-semibold text-gray-900">{meal.mealName}</h3>
                <p className="text-gray-600 mt-1">{meal.description}</p>
                <p className="text-lg font-medium text-gray-900 mt-2">${meal.price}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(meal)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(meal._id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span>Views: {meal.views || 0}</span>
                    <span className="mx-2">•</span>
                    <span>Sales: {meal.sales || 0}</span>
                  </div>
                </div>
              </DashboardCardContent>
            </DashboardCard>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {activeCardId && (
        <Modal
          isOpen={true}
          onClose={() => setActiveCardId(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default VendorDashboard;