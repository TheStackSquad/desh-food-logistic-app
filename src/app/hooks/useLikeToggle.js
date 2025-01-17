// hooks/useLikeToggle.js
'use client';

import { toggleRecent } from '@/reduxStore/actions/authActions';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function useLikeToggle(dispatch, user, recentItems) {
  const [pendingLikes, setPendingLikes] = useState(new Set());

  const handleLikeToggle = async (meal) => {
    if (!user?.username) {
      toast.error('Please log in to save favorites');
      return;
    }

    setPendingLikes((prev) => new Set([...prev, meal._id]));

    try {
      await dispatch(toggleRecent(meal));
      toast.success(
        recentItems.some((item) => item._id === meal._id)
          ? 'Removed from favorites'
          : 'Added to favorites'
      );
    } finally {
      setPendingLikes((prev) => {
        const updated = new Set(prev);
        updated.delete(meal._id);
        return updated;
      });
    }
  };

  return { handleLikeToggle, pendingLikes };
}
