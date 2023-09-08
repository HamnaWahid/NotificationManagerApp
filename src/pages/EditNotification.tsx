import NotificationForm from '../common/NotificationForm/NotificationForm';
import Paper from '@mui/material/Paper';

const NotificationEdit = () => {
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
          message='Edit Notification' // Pass the message prop
        />
      </Paper>
    </div>
  );
};

export default NotificationEdit;
