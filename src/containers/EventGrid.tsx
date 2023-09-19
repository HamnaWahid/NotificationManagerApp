import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiServices/serviceClient";

interface EventData {
  eventName: string;
  eventDescription: string;
}

// Define a function to fetch the events
export const fetchEvents = async (
  applicationId: string | number | null, // Make sure applicationId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string, // Add sortBy as a parameter
  sortOrder?: string, // Add sortOrder as a parameter
  isActive?: boolean | null // Add isActive parameter
) => {
  // Check if applicationId is not null before constructing the params
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (applicationId !== null) {
    params.set("applicationId", applicationId.toString());
  }

  if (searchTerm && searchTerm.length >= 3) {
    params.set("eventName", searchTerm);
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

  const response = await apiClient.get(`/events/?${params}`);

  return response.data;
};

// Create a React Query hook to fetch the events
export const useEvents = (
  applicationId: string | number | null, // Make sure applicationId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string,
  isActive?: boolean | null // Add isActive parameter
) => {
  return useQuery(
    [
      "events",
      applicationId,
      page,
      pageSize,
      searchTerm,
      sortBy,
      sortOrder,
      isActive,
    ],
    () =>
      fetchEvents(
        applicationId,
        page,
        pageSize,
        searchTerm,
        sortBy,
        sortOrder,
        isActive
      ),
    {
      staleTime: 1000,
    }
  );
};

export const deleteEvent = async (eventId: string | number): Promise<void> => {
  const response = await apiClient.patch(`/events/${eventId}/delete`);
  console.log("responseeee", response);
  return response.data; // You may handle the response data as needed
};

export const deactivateEvent = async (
  eventId: string | number
): Promise<void> => {
  const response = await apiClient.patch(`/events/${eventId}/deactivate`);
  return response.data; // You may handle the response data as needed
};

export const updateEvent = async (
  eventId: string | number,
  data: EventData
): Promise<void> => {
  try {
    const response = await apiClient.put(`/events/${eventId}/update`, data);
    console.log("Event updated:", response.data);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};

export const addEvent = async (data: EventData): Promise<void> => {
  try {
    const response = await apiClient.post("/events/", data);
    console.log("Event added:", response.data);
  } catch (error) {
    console.error("Error adding event:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
