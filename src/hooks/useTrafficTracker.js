import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trafficStore } from '../utils/adminStore';

/**
 * Hook to automatically track page views → PHP API → MySQL
 * Tracks on every route change. Skips admin pages.
 */
const useTrafficTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/z8admin')) return;
    if (location.pathname.startsWith('/admin')) return;
    
    // Send to PHP backend → MySQL
    trafficStore.track(location.pathname);
  }, [location.pathname]);
};

export default useTrafficTracker;
