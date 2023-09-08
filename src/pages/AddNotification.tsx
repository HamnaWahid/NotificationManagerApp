import Paper from '@mui/material/Paper';
import NotificationForm from '../components/Notifications/NotificationForm';

const AddNotification = () => {
  const handleFormSubmit = (formData: {
    name: string;
    subject: string;
    description: string;
    body: string;
  }) => {
    console.log('NotificationEdit - Form Data:', formData);
    // You can handle form submission logic here
  };

  const handleFormCancel = () => {
    console.log('NotificationEdit - Form Cancelled');
  };

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message='Add Notification' // Pass the message prop
        />
      </Paper>
    </div>
  );
};

export default AddNotification;
