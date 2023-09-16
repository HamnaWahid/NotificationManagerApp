import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3000/api/notifications"; // Replace with your backend URL

interface NotificationData {
  notificationName: string;
  notificationDescription: string;
}

// Define a function to fetch the notifications
export const fetchNotifications = async (
  eventId: string | number, // Make sure eventId can be null
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  // Check if eventId is not null before constructing the params
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (eventId !== null) {
    params.set("eventId", eventId.toString());
  } else console.log("it is nullll");

  if (searchTerm && searchTerm.length >= 3) {
    params.set("notificationName", searchTerm);
  }
  console.log(eventId);
  const response = await axios.get(`${API_BASE_URL}?${params}`);
  return response.data;
};

// Create a React Query hook to fetch the notifications
export const useNotifications = (
  eventId: string | number, // Make sure eventId can be null
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  return useQuery(
    ["notifications", eventId, page, pageSize, searchTerm],
    () => fetchNotifications(eventId, page, pageSize, searchTerm),
    {
      staleTime: 1000,
    }
  );
};

export const deleteNotification = async (
  notificationId: string | number
): Promise<void> => {
  const response = await axios.patch(
    `${API_BASE_URL}/${notificationId}/delete`
  );
  return response.data; // You may handle the response data as needed
};

export const deactivateNotification = async (
  notificationId: string | number
): Promise<void> => {
  const response = await axios.patch(
    `${API_BASE_URL}/${notificationId}/deactivate`
  );
  return response.data; // You may handle the response data as needed
};

export const updateNotification = async (
  notificationId: string | number,
  data: NotificationData
): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${notificationId}/update`,
      data
    );
    // Handle the response as needed
    console.log("Notification updated:", response.data);
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};

export const addNotification = async (
  data: NotificationData
): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, data);
    console.log("Notification added:", response.data);
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
