import api from './api';
import AuthService from './auth.service';

const ComplaintService = {
  createComplaint: async (complaintData) => {
    const token = AuthService.getToken();
    const response = await api.post('/complaints', complaintData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getComplaints: async () => {
    const token = AuthService.getToken();
    const response = await api.get('/complaints', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default ComplaintService;
