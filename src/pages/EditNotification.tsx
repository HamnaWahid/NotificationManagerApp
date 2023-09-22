// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import NotificationForm, {
//   PropsData,
// } from '../components/Notifications/NotificationForm';
// import Paper from '@mui/material/Paper';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { useNotificationById } from '../containers/NotificationGrid';
// import { updateNotification2 } from '../containers/NotificationGrid';
// import Loading from '../common/Loading';

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
//   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
// });

// const NotificationEdit = () => {
//   const { eventId, notifId } = useParams();

//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>('');

//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState<string>('');
//   const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
//     'success'
//   );

//   const { data: notificationData, isLoading: notificationLoading } =
//     useNotificationById(eventId as number | string, notifId as number | string);

//   const handleFormSubmit = async (formData: PropsData) => {
//     try {
//       await updateNotification2(notifId || '', formData);
//       setSnackbarMessage('Notification updated successfully.');
//       setShowSnackbar(true);
//       window.history.back();
//     } catch (error) {
//       setAlertMessage(
//         `Error updating notification: ${
//           error.response?.data.error || error.response.data
//         }`
//       );
//       setAlertSeverity('error');
//       setShowAlert(true);
//     }
//   };

//   const handleFormCancel = () => {
//     window.history.back();
//   };

//   useEffect(() => {}, []);

//   if (notificationLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <Paper elevation={3}>
//         <NotificationForm
//           data={notificationData['notifications'][0]}
//           notificationId={notifId || ''}
//           eventId={eventId || ''}
//           onSubmit={handleFormSubmit}
//           onCancel={handleFormCancel}
//           message='Edit Notification'
//         />
//       </Paper>

//       {showSnackbar && (
//         <Snackbar
//           open={showSnackbar}
//           autoHideDuration={6000}
//           onClose={() => setShowSnackbar(false)}
//         >
//           <Alert severity='success' onClose={() => setShowSnackbar(false)}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       )}

//       {showAlert && (
//         <Snackbar
//           open={showAlert}
//           autoHideDuration={2000}
//           onClose={() => setShowAlert(false)}
//           style={{
//             top: '20%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
//             {alertMessage}
//           </Alert>
//         </Snackbar>
//       )}
//     </div>
//   );
// };

// export default NotificationEdit;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotificationForm, {
  PropsData,
} from "../components/Notifications/NotificationForm";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNotificationById } from "../containers/NotificationGrid";
import { updateNotification2 } from "../containers/NotificationGrid";
import Loading from "../common/Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationEdit = () => {
  const { eventId, notifId } = useParams();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  const { data: notificationData, isLoading: notificationLoading } =
    useNotificationById(eventId as number | string, notifId as number | string);

  const handleFormSubmit = async (formData: PropsData) => {
    try {
      await updateNotification2(notifId || "", formData);
      setSnackbarMessage("Notification updated successfully.");
      setShowSnackbar(true);
      window.history.back();
    } catch (error) {
      setAlertMessage(
        `Error updating notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  const handleFormCancel = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };

  const handleCancelConfirm = () => {
    setCancelDialogOpen(false);
    window.history.back();
  };

  useEffect(() => {}, []);

  if (notificationLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          data={notificationData["notifications"][0]}
          notificationId={notifId || ""}
          eventId={eventId || ""}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message="Edit Notification"
        />
      </Paper>

      <Dialog open={isCancelDialogOpen} onClose={handleCancelDialogClose}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your data will be lost. Are you sure you want to leave?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirm} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancelDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setShowSnackbar(false)}>
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
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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

export default NotificationEdit;
