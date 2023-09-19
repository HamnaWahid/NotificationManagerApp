import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiServices/serviceClient";
import { PropsData } from "../components/Notifications/NotificationForm";

interface NotificationData {
  notificationName: string;
  notificationDescription: string;
}

// Define a function to fetch the notifications
export const fetchNotifications = async (
  eventId: string | number, // Make sure eventId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string, // Add sortBy as a parameter
  sortOrder?: string // Add sortOrder as a parameter
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
  // Add sorting parameters to the URL if provided
  if (sortBy && sortOrder) {
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
  }
  console.log(eventId);
  const response = await apiClient.get(`/notifications/?${params}`);
  return response.data;
};

// Create a React Query hook to fetch the notifications
export const useNotifications = (
  eventId: string | number, // Make sure eventId can be null
  page: number,
  pageSize: number,
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: string
) => {
  return useQuery(
    ["notifications", eventId, page, pageSize, searchTerm, sortBy, sortOrder],
    () =>
      fetchNotifications(
        eventId,
        page,
        pageSize,
        searchTerm,
        sortBy,
        sortOrder
      ),
    {
      staleTime: 1000,
    }
  );
};

export const deleteNotification = async (
  notificationId: string | number
): Promise<void> => {
  const response = await apiClient.patch(
    `/notifications/${notificationId}/delete`
  );

  return response.data; // You may handle the response data as needed
};

export const deactivateNotification = async (
  notificationId: string | number
): Promise<void> => {
  const response = await apiClient.patch(
    `/notifications/${notificationId}/deactivate`
  );
  console.log(response);
  return response.data; // You may handle the response data as needed
};

export const updateNotification = async (
  notificationId: string | number,
  data: NotificationData
): Promise<void> => {
  try {
    const response = await apiClient.put(
      `/notifications/${notificationId}/update`,
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
    const response = await apiClient.post("/notifications/", data);
    console.log("Notification added:", response.data);
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
// Define a function to fetch a notification by ID
export const fetchNotificationById = async (
  eventId: string | number,
  notificationId: string | number
) => {
  try {
    const response = await apiClient.get(
      `/notifications?eventId=${eventId}&notificationId=${notificationId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
// Create a React Query hook to fetch a notification by ID
export const useNotificationById = (
  eventId: string | number,
  notificationId: string | number
) => {
  return useQuery(["notification", eventId, notificationId], () =>
    fetchNotificationById(eventId, notificationId)
  );
};
export const updateNotification2 = async (
  notificationId: string | number,
  data: PropsData
): Promise<void> => {
  try {
    const response = await apiClient.put(
      `/notifications/${notificationId}/update`,
      data
    );

    // Handle the response as needed
    console.log("Notification updated:", response.data);
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error; // You can handle or propagate the error as necessary
  }
};
