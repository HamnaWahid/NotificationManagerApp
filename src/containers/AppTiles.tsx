import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3000/api/applications'; // Replace with your backend URL

// Define a function to fetch the applications
export const fetchApplications = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.applications;
};

// Create a React Query hook to fetch the applications
export const useApplications = () => {
  return useQuery(['applications'], fetchApplications);
};
