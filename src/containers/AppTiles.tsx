import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3000/api/applications'; // Replace with your backend URL
interface ApplicationData {
  appName: string;
  appDescription: string;
}
export const updateApplication = async (
  applicationId: string | number,
  data: ApplicationData
): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${applicationId}/update`,
      data
    );
    // Handle the response as needed
    console.log('Application updated:', response.data);
  } catch (error) {
    console.error('Error updating application:', error);
    throw error; // You can handle or propagate the error as necessary
  }
};

// Define a function to fetch the applications
export const fetchApplications = async (
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchTerm && searchTerm.length >= 3) {
    params.set('appName', searchTerm);
  }

  const response = await axios.get(`${API_BASE_URL}?${params}`);
  return response.data;
};

// Create a React Query hook to fetch the applications
export const useApplications = (
  page: number,
  pageSize: number,
  searchTerm?: string // Add searchTerm parameter
) => {
  return useQuery(
    ['applications', page, pageSize, searchTerm], // Update the query key
    () => fetchApplications(page, pageSize, searchTerm), // Pass searchTerm to fetchApplications
    {
      staleTime: 1000,
    }
  );
};

export const deleteApplication = async (
  applicationId: string | number
): Promise<void> => {
  const response = await axios.patch(`${API_BASE_URL}/${applicationId}/delete`);
  return response.data; // You may handle the response data as needed
};

export const deactivateApplication = async (
  applicationId: string | number
): Promise<void> => {
  const response = await axios.patch(
    `${API_BASE_URL}/${applicationId}/deactivate`
  );
  return response.data; // You may handle the response data as needed
};

export const addApplication = async (data: ApplicationData): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, data);
    console.log('Application added:', response.data);
  } catch (error) {
    console.error('Error adding application:', error);
    throw error; // You can handle or propagate the error as necessary
  }
};
