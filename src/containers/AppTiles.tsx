import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiServices/serviceClient';
interface ApplicationData {
  appName: string;
  appDescription: string;
}
export const updateApplication = async (
  applicationId: string | number,
  data: ApplicationData
): Promise<void> => {
  try {
    const response = await apiClient.put(
      `/applications/${applicationId}/update`,
      data
    );
    console.log('Application updated:', response.data);
  } catch (error) {
    console.error('Error updating application:', error);
    throw error; // You can handle or propagate the error as necessary
  }
};
export const fetchApplications = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  isActive?: boolean | null
) => {
  const params = new URLSearchParams();

  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());

  if (sortBy && sortOrder) {
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
  }

  if (isActive !== undefined && isActive !== null) {
    params.set('isActive', isActive.toString());
  }

  if (searchTerm && searchTerm.length >= 3) {
    params.set('appName', searchTerm);
  } else {
    params.set('appName', '');
  }

  const response = await apiClient.get(`/applications/?${params.toString()}`);
  return response.data;
};

export const useApplications = (
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  isActive?: boolean | null
) => {
  return useQuery(
    ['applications', page, pageSize, searchTerm, sortBy, sortOrder, isActive],
    async () => {
      // Reset page to 1 only when the searchTerm changes and meets the length requirement

      const data = await fetchApplications(
        page,
        pageSize,
        searchTerm,
        sortBy,
        sortOrder,
        isActive
      );
      return {
        ...data,
        currentPage: page, // Ensure we use the correct page in case of reset
      };
    },
    {
      staleTime: 1000,
    }
  );
};

export const deleteApplication = async (
  applicationId: string | number
): Promise<void> => {
  const response = await apiClient.patch(
    `/applications/${applicationId}/delete`
  );

  return response.data; // You may handle the response data as needed
};

export const deactivateApplication = async (
  applicationId: string | number
): Promise<void> => {
  const response = await apiClient.patch(
    `/applications/${applicationId}/deactivate`
  );

  return response.data; // You may handle the response data as needed
};

export const addApplication = async (data: ApplicationData): Promise<void> => {
  try {
    const response = await apiClient.post('/applications/', data);
    console.log('Application added:', response.data);
  } catch (error) {
    console.error('Error adding application:', error);
    throw error; // You can handle or propagate the error as necessary
  }
};
