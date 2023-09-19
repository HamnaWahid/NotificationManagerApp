import { useParams } from "react-router-dom";
import NotificationForm, {
  PropsData,
} from "../components/Notifications/NotificationForm";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useNotificationById } from "../containers/NotificationGrid"; // Import the useNotificationById hook
import { updateNotification2 } from "../containers/NotificationGrid";

const NotificationEdit = () => {
  const { eventId, notifId } = useParams(); // Specify the expected types for id and eventId

  console.log("helooo", eventId, notifId);

  const { data: notificationData, isLoading: notificationLoading } =
    useNotificationById(eventId as number | string, notifId as number | string);

  console.log("data notification", notificationData);

  const handleFormSubmit = async (formData: PropsData) => {
    console.log("NotificationEdit - Form Data:", formData);

    try {
      await updateNotification2(notifId || "", formData); // Call the updateNotification2 function
      // Handle success, navigate back to the previous page using window.location
      window.history.back(); // Go back one step in the browser history
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleFormCancel = () => {
    console.log("NotificationEdit - Form Cancelled");
    // Navigate back to the previous page using window.location
    window.history.back(); // Go back one step in the browser history
  };

  useEffect(() => {});

  if (notificationLoading) {
    return "loading...";
  }

  console.log("data", notificationData["notifications"][0]);

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          data={notificationData["notifications"][0]}
          notificationId={notifId || ""} // Provide a default value in case id is undefined
          eventId={eventId || ""} // Provide a default value in case eventId is undefined
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message="Edit Notification"
        />
      </Paper>
    </div>
  );
};

export default NotificationEdit;
