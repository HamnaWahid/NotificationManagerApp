// import React, { useState } from "react";
// import NotificationForm, {
//   PropsData,
// } from "../components/Notifications/NotificationForm";
// import Paper from "@mui/material/Paper";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { useParams } from "react-router-dom";
// import { addNotification } from "../containers/NotificationGrid";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const AddNotification = () => {
//   const { eventId } = useParams();
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState<string>("");
//   const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
//     "success"
//   );
//   const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

//   const handleFormSubmit = async (formData: PropsData) => {
//     try {
//       await addNotification({ ...formData, eventId });
//       setSnackbarMessage("Notification added successfully.");
//       setShowSnackbar(true);
//       window.history.back();
//     } catch (error) {
//       console.error("Error adding notification:", error);
//       setAlertMessage(
//         `Error updating notification: ${
//           error.response?.data.error || error.response.data
//         }`
//       );
//       setAlertSeverity("error");
//       setShowAlert(true);
//     }
//   };

//   const handleFormCancel = () => {
//     setCancelDialogOpen(true);
//   };

//   const handleCancelDialogClose = () => {
//     setCancelDialogOpen(false);
//   };

//   const handleCancelConfirm = () => {
//     setCancelDialogOpen(false);
//     window.history.back();
//   };

//   return (
//     <div>
//       <Paper elevation={3}>
//         <NotificationForm
//           data={null}
//           notificationId=""
//           eventId={eventId || ""}
//           onSubmit={handleFormSubmit}
//           onCancel={handleFormCancel}
//           message="Add Notification"
//         />
//       </Paper>

//       <Dialog open={isCancelDialogOpen} onClose={handleCancelDialogClose}>
//         <DialogTitle>Confirm Cancel</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Your data will be lost. Are you sure you want to leave?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelConfirm} color="primary">
//             Yes
//           </Button>
//           <Button onClick={handleCancelDialogClose} color="primary">
//             No
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {showSnackbar && (
//         <Snackbar
//           open={showSnackbar}
//           autoHideDuration={2000}
//           onClose={() => setShowSnackbar(false)}
//         >
//           <Alert severity="success" onClose={() => setShowSnackbar(false)}>
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
//             top: "20%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
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

// export default AddNotification;
import React, { useState, useEffect } from "react";
import NotificationForm, {
  PropsData,
} from "../components/Notifications/NotificationForm";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { addNotification } from "../containers/NotificationGrid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddNotification = () => {
  const { eventId } = useParams();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Define the confirmation message and event handler
  const confirmationMessage =
    "You have unsaved changes. Are you sure you want to leave?";

  const handleBeforeUnload = (e) => {
    // Display the confirmation message when the user tries to reload or close the page
    e.preventDefault();
    e.returnValue = confirmationMessage; // For Chrome and Firefox
    return confirmationMessage; // For other browsers
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleFormSubmit = async (formData: PropsData) => {
    try {
      await addNotification({ ...formData, eventId });
      setSnackbarMessage("Notification added successfully.");
      setShowSnackbar(true);
      window.history.back();
    } catch (error) {
      console.error("Error adding notification:", error);
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

  return (
    <div>
      <Paper elevation={3}>
        <NotificationForm
          data={null}
          notificationId=""
          eventId={eventId || ""}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message="Add Notification"
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
          autoHideDuration={2000}
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

export default AddNotification;
