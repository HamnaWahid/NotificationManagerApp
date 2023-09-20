import React, { useState } from 'react';
import NotificationForm, {
  PropsData,
} from '../components/Notifications/NotificationForm';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { addNotification } from '../containers/NotificationGrid';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AddNotification = () => {
  const { eventId } = useParams();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleFormSubmit = async (formData: PropsData) => {
    try {
      await addNotification({ ...formData, eventId });
      setSnackbarMessage('Notification added successfully.');
      setShowSnackbar(true);
      window.history.back();
    } catch (error) {
      console.error('Error adding notification:', error);
      setAlertMessage(
        `Error updating notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleFormCancel = () => {
    window.history.back();
  };

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          data={null}
          notificationId=''
          eventId={eventId || ''}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message='Add Notification'
        />
      </Paper>

      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity='success' onClose={() => setShowSnackbar(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}

      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={2000}
          onClose={() => setShowAlert(false)}
          style={{
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default AddNotification;
