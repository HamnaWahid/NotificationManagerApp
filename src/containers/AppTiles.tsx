import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiServices/serviceClient";
// const API_BASE_URL = 'http://localhost:3000/api/applications'; // Replace with your backend URL
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
    console.log("Application updated:", response.data);
  } catch (error) {
    console.error("Error updating application:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};

// Define a function to fetch the applications
export const fetchApplications = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  isActive?: boolean | null // Add isActive parameter
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchTerm && searchTerm.length >= 3) {
    params.set("appName", searchTerm);
  }

  // Add sorting parameters to the URL if provided
  if (sortBy && sortOrder) {
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
  }

  // Add isActive parameter to the URL if provided and not null
  if (isActive !== undefined && isActive !== null) {
    params.set("isActive", isActive.toString());
  }

  const response = await apiClient.get(`/applications/?${params}`);

  return response.data;
};

// Create a React Query hook to fetch the applications
export const useApplications = (
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  isActive?: boolean | null // Add isActive parameter
) => {
  return useQuery(
    // Update the query key to include searchTerm, sortBy, sortOrder, and isActive
    ["applications", page, pageSize, searchTerm, sortBy, sortOrder, isActive],
    () =>
      fetchApplications(
        page,
        pageSize,
        searchTerm,
        sortBy,
        sortOrder,
        isActive
      ), // Pass all parameters to fetchApplications
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
    const response = await apiClient.post("/applications/", data);
    console.log("Application added:", response.data);
  } catch (error) {
    console.error("Error adding application:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
