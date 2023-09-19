import React from 'react';
import NotificationForm, {
  PropsData,
} from '../components/Notifications/NotificationForm';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { addNotification } from '../containers/NotificationGrid'; // Import the addNotification function

const AddNotification = () => {
  const { eventId } = useParams(); // Get the eventId from the URL params

  const handleFormSubmit = async (formData: PropsData) => {
    try {
      // Include eventId in the data sent to addNotification
      await addNotification({ ...formData, eventId });
      // Handle success, navigate back to the previous page using window.location
      window.history.back(); // Go back one step in the browser history
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const handleFormCancel = () => {
    // Navigate back to the previous page using window.location
    window.history.back(); // Go back one step in the browser history
  };

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          data={null} // Pass null as data since it's a new notification
          notificationId='' // Pass an empty string as notificationId for new notifications
          eventId={eventId || ''} // Provide a default value in case eventId is undefined
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message='Add Notification'
        />
      </Paper>
    </div>
  );
};

export default AddNotification;
