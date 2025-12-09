import api from './api';
import AuthService from './auth.service';

const ComplaintService = {
  createComplaint: async (complaintData) => {
    const response = await api.post('/complaints', complaintData);
    return response.data;
  },

  getComplaints: async () => {
    const response = await api.get('/complaints');
    return response.data;
  },

  getComplaintById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },

  updateComplaintStatus: async (id, statusData) => {
    const response = await api.put(`/complaints/${id}/status`, statusData);
    return response.data;
  },

  assignComplaint: async (id, staffId) => {
    const response = await api.put(`/complaints/${id}/assign`, { staffId });
    return response.data;
  },
};

export default ComplaintService;
