import api from './api';
import AuthService from './auth.service';

const ComplaintService = {
  createComplaint: async (complaintData) => {
    // Convert FormData to regular object for now (file uploads can be added later)
    let data = complaintData;
    if (complaintData instanceof FormData) {
      data = {
        title: complaintData.get('title'),
        category: complaintData.get('category'),
        location: complaintData.get('location'),
        priority: complaintData.get('priority'),
        description: complaintData.get('description')
      };
    }
    
    const response = await api.post('/complaints', data);
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
