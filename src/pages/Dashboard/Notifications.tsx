import React, { useEffect, useState } from "react";
import Tile from "../../common/Tiles/Tile";
import {
  Slide,
  Paper,
  Grid,
  IconButton,
  Dialog,
  Alert,
  AlertTitle, // Added AlertTitle import
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  useNotifications,
  deleteNotification,
  deactivateNotification,
  updateNotification,
} from "../../containers/NotificationGrid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NotificationFormComponent from "../../common/Form/NotificationFormComponent";
import { useQueryClient } from "@tanstack/react-query";
import "./Tiles.css";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface NotificationData {
  isActive: boolean;
  id: number;
  _id: string;
  notificationName: string;
  notificationDescription: string;
  dateCreated: string;
  dateUpdated: string;
}

interface NotificationsProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  searchTerm: string;
  clickedEventId: string | number;
  onNotificationTileClick: (notificationId: string | number) => void;
  sortBy: string;
  sortOrder: string;
  isActive: boolean | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const pageSize = 6;

const Notifications: React.FC<NotificationsProps> = ({
  searchTerm,
  clickedEventId,
  page,
  setPage,
  onNotificationTileClick,
  sortBy,
  sortOrder,
  isActive,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedNotificationData, setSelectedNotificationData] =
    useState<NotificationData | null>(null);

  const [clickedTileIds, setClickedTileIds] = useState<Set<string | number>>(
    new Set()
  );
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteDialogData, setDeleteDialogData] =
    useState<NotificationData | null>(null);
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      setCurrentPage(1);
      setPage(1);
    }
  }, [searchTerm, page]);

  const navigate = useNavigate();

  const {
    data: TilesData,
    isLoading,
    isError,
  } = useNotifications(
    clickedEventId,
    page,
    pageSize,
    searchTerm,
    sortBy,
    sortOrder,
    isActive
  );

  const queryClient = useQueryClient();

  const handleNext = () => {
    if (page < TilesData.totalPages) {
      queryClient.invalidateQueries([
        "notifications",
        clickedEventId,
        currentPage + 1,
        pageSize,
      ]);
      setPage(page + 1);

      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      queryClient.invalidateQueries([
        "notifications",
        clickedEventId,
        page - 1,
        pageSize,
      ]);

      setCurrentPage(currentPage - 1);
      setPage(page - 1);
    }
  };

  const handleUpdateClick = (data: NotificationData) => {
    setSelectedNotificationData(data);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpdateAction = async (formData: {
    notificationName: string;
    notificationDescription: string;
  }) => {
    if (selectedNotificationData) {
      try {
        await updateNotification(
          selectedNotificationData.id || selectedNotificationData._id,
          formData
        );
        queryClient.invalidateQueries([
          "notifications",
          clickedEventId,
          currentPage,
          pageSize,
          searchTerm,
        ]);
        handleCloseDialog();
      } catch (error) {
        console.error("Error updating notification:", error);
        setAlertMessage(
          `Error updating notification: ${
            error.response?.data.error || error.response.data
          }`
        );
        setAlertSeverity("error");
        setShowAlert(true);
      }
    }
  };

  const handleDeleteClick = async (notificationId: string | number) => {
    try {
      await deleteNotification(notificationId);
      queryClient.invalidateQueries([
        "notifications",
        clickedEventId,
        currentPage,
        pageSize,
      ]);
      setPage(1);
    } catch (error) {
      console.error("Error deleting notification:", error);
      setAlertMessage(
        `Error deleting notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  const handleToggleClick = async (notificationId: string | number) => {
    try {
      await deactivateNotification(notificationId);
      queryClient.invalidateQueries([
        "notifications",
        clickedEventId,
        page,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error("Error deactivating notification:", error);
      setAlertMessage(
        `Error deactivating notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  const handleTileClick = (tileId: string | number) => {
    const updatedClickedTileIds = new Set(clickedTileIds);
    if (updatedClickedTileIds.has(tileId)) {
      updatedClickedTileIds.delete(tileId);
    } else {
      updatedClickedTileIds.add(tileId);
    }
    setClickedTileIds(updatedClickedTileIds);

    onNotificationTileClick(tileId);

    navigate(`/edit-notification/${clickedEventId}/${tileId}`);
  };

  const handleDeleteDialogOpen = (data: NotificationData) => {
    setDeleteDialogData(data);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteDialogData) {
      handleDeleteClick(deleteDialogData.id || deleteDialogData._id);
      handleDeleteDialogClose();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    setAlertMessage(
      `Error fetching data: ${
        error.response?.data.error || error.response.data
      }`
    );
    setAlertSeverity("error");
    setShowAlert(true);
    return <div>Error fetching data</div>;
  }
  if (!TilesData?.notifications || TilesData.notifications.length === 0) {
    return (
      <Alert severity="warning" variant="outlined">
        <AlertTitle>Warning</AlertTitle>
        This event has no notifications
      </Alert>
    );
  } else {
    return (
      <>
        <div className="notifications">
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Grid container spacing={2} className="gridcontainer">
              {TilesData?.notifications?.map((data: NotificationData) => (
                <Grid item xs={12} sm={6} md={4} key={data.id || data._id}>
                  <Tile
                    Id={data.id || data._id}
                    title={data.notificationName}
                    description={data.notificationDescription}
                    dateCreated={data.dateCreated}
                    dateUpdated={data.dateUpdated}
                    isToggled={data.isActive}
                    onUpdateClick={() => handleUpdateClick(data)}
                    onDeleteClick={() => handleDeleteDialogOpen(data)}
                    onToggleClick={() => handleToggleClick(data.id || data._id)}
                    onTileClick={() => handleTileClick(data.id || data._id)}
                    isClicked={clickedTileIds.has(data.id || data._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Slide>

          <Paper elevation={1} square>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title="Back">
                <IconButton onClick={handleBack} disabled={page === 1}>
                  <ArrowBackIos />
                </IconButton>
              </Tooltip>
              <span style={{ margin: "0 5px" }}>
                {page || 1} of {TilesData?.totalPages || 1}
              </span>
              <Tooltip title="Next">
                <IconButton
                  onClick={handleNext}
                  disabled={page === TilesData?.totalPages}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Tooltip>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1, textAlign: "center" }}>
                Notifications: {TilesData?.totalNotifications}
              </div>
            </div>
          </Paper>
        </div>

        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          {selectedNotificationData && (
            <NotificationFormComponent
              onCancel={handleCloseDialog}
              onSubmit={handleUpdateAction}
              message="Update Notification"
              initialName={selectedNotificationData.notificationName}
              initialDescription={
                selectedNotificationData.notificationDescription
              }
              title={"Edit Notification"}
            />
          )}
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <div>Are you sure you want to delete the notification?</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {showSnackbar && (
          <Snackbar
            open={showSnackbar}
            autoHideDuration={1300}
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
            autoHideDuration={1300}
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
      </>
    );
  }
};

export default Notifications;
