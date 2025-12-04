import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ComplaintService from '../services/complaint.service';
import { useAuth } from './AuthContext'; // To react to auth changes

export const ComplaintContext = createContext({
  complaints: [],
  loading: false,
  error: null,
  fetchComplaints: () => {},
  createComplaint: () => {}, // Though handled by form, good to have a centralized function
  updateComplaint: () => {},
  deleteComplaint: () => {}
});

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth(); // React to authentication state

  const fetchComplaints = useCallback(async () => {
    if (!isAuthenticated()) {
        setComplaints([]);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await ComplaintService.getComplaints();
      setComplaints(data);
    } catch (err) {
      setError('Failed to fetch complaints.');
      console.error('Failed to fetch complaints:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const createComplaint = useCallback(async (complaintData) => {
    if (!isAuthenticated()) {
        throw new Error('User not authenticated.');
    }
    setLoading(true);
    setError(null);
    try {
        const newComplaint = await ComplaintService.createComplaint(complaintData);
        setComplaints((prev) => [newComplaint, ...prev]);
        return newComplaint;
    } catch (err) {
        setError('Failed to create complaint.');
        console.error('Failed to create complaint:', err);
        throw err;
    } finally {
        setLoading(false);
    }
  }, [isAuthenticated]);

  // TODO: Implement updateComplaint and deleteComplaint later

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints, token]); // Re-fetch when auth state changes or token updates

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        loading,
        error,
        fetchComplaints,
        createComplaint,
        // updateComplaint,
        // deleteComplaint,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
