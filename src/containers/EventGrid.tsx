import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3000/api/events"; // Replace with your backend URL

interface EventData {
  eventName: string;
  eventDescription: string;
}

// Define a function to fetch the events
export const fetchEvents = async (
  applicationId: string | number, // Make sure applicationId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string, // Add sortBy as a parameter
  sortOrder?: string // Add sortOrder as a parameter
) => {
  // Check if applicationId is not null before constructing the params
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (applicationId !== null) {
    params.set("applicationId", applicationId.toString());
  } else console.log("it is nullll");

  if (searchTerm && searchTerm.length >= 3) {
    params.set("eventName", searchTerm);
  }

  // Add sorting parameters to the URL if provided
  if (sortBy && sortOrder) {
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
  }
  console.log(applicationId);
  const response = await axios.get(`${API_BASE_URL}?${params}`);
  return response.data;
};

// Create a React Query hook to fetch the events
export const useEvents = (
  applicationId: string | number, // Make sure applicationId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string
) => {
  return useQuery(
    ["events", applicationId, page, pageSize, searchTerm, sortBy, sortOrder],
    () =>
      fetchEvents(applicationId, page, pageSize, searchTerm, sortBy, sortOrder),
    {
      staleTime: 1000,
    }
  );
};

export const deleteEvent = async (eventId: string | number): Promise<void> => {
  console.log("eventId in delete", eventId);
  console.log(`${API_BASE_URL}/${eventId}/delete`);
  const response = await axios.patch(`${API_BASE_URL}/${eventId}/delete`);
  console.log("responseeee", response);
  return response.data; // You may handle the response data as needed
};

export const deactivateEvent = async (
  eventId: string | number
): Promise<void> => {
  const response = await axios.patch(`${API_BASE_URL}/${eventId}/deactivate`);
  return response.data; // You may handle the response data as needed
};

export const updateEvent = async (
  eventId: string | number,
  data: EventData
): Promise<void> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${eventId}/update`, data);
    // Handle the response as needed
    console.log("Event updated:", response.data);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};

export const addEvent = async (data: EventData): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, data);
    console.log("Event added:", response.data);
  } catch (error) {
    console.error("Error adding event:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
