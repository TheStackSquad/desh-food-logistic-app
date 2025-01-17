import { useState, useEffect, useCallback } from 'react';

const useMeals = (selectedType) => {
  const [state, setState] = useState({
    meals: [],
    loading: false,
    error: null,
  });

  // Fetch meals from API
  const fetchMeals = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`/api/Menu?category=${selectedType}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      setState({ meals: data, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching meals:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load meals',
      }));
    }
  }, [selectedType]);

  // Trigger fetch on type change
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return state; // Returns { meals, loading, error }
};

export default useMeals;
