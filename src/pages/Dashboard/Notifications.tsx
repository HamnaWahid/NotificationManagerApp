import React, { useState } from 'react';
import Tile from '../../common/Tiles/Tile';
import { Slide, Paper, Grid, IconButton, Dialog } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
  useNotifications,
  deleteNotification,
  deactivateNotification,
  updateNotification,
} from '../../containers/NotificationGrid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NotificationFormComponent from '../../common/Form/NotificationFormComponent';
import { useQueryClient } from '@tanstack/react-query';
import './Tiles.css';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface NotificationData {
  isActive: boolean;
  id: number;
  _id: string;
  notificationName: string;
  notificationDescription: string;
}

interface NotificationsProps {
  searchTerm: string;
  clickedEventId: string | number;
  onNotificationTileClick: (notificationId: string | number) => void;
  sortBy: string;
  sortOrder: string;
  isActive: boolean | null; // Add isActive prop
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const pageSize = 6;

const Notifications: React.FC<NotificationsProps> = ({
  searchTerm,
  clickedEventId,
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
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const navigate = useNavigate();

  const {
    data: TilesData,
    isLoading,
    isError,
  } = useNotifications(
    clickedEventId,
    currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortOrder,
    isActive
  );

  const queryClient = useQueryClient();

  const handleNext = () => {
    if (currentPage < TilesData.totalPages) {
      queryClient.invalidateQueries([
        'notifications',
        clickedEventId,
        currentPage + 1,
        pageSize,
      ]);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      queryClient.invalidateQueries([
        'notifications',
        clickedEventId,
        currentPage - 1,
        pageSize,
      ]);
      setCurrentPage(currentPage - 1);
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
          'notifications',
          clickedEventId,
          currentPage,
          pageSize,
          searchTerm,
        ]);
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating notification:', error);
        setAlertMessage(
          `Error updating notification: ${
            error.response?.data.error || error.response.data
          }`
        );
        setAlertSeverity('error');
        setShowAlert(true);
      }
    }
  };

  const handleDeleteClick = async (notificationId: string | number) => {
    try {
      await deleteNotification(notificationId);
      queryClient.invalidateQueries([
        'notifications',
        clickedEventId,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error('Error deleting notification:', error);
      setAlertMessage(
        `Error deleting notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleToggleClick = async (notificationId: string | number) => {
    try {
      await deactivateNotification(notificationId);
      queryClient.invalidateQueries([
        'notifications',
        clickedEventId,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error('Error deactivating notification:', error);
      setAlertMessage(
        `Error deactivating notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity('error');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    setAlertMessage(
      `Eroor Fetching data: ${
        error.response?.data.error || error.response.data
      }`
    );
    setAlertSeverity('error');
    setShowAlert(true);
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className='notifications'>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={2} className='gridcontainer'>
            {TilesData?.notifications?.map((data: NotificationData) => (
              <Grid item xs={12} sm={6} md={4} key={data.id || data._id}>
                <Tile
                  Id={data.id || data._id}
                  title={data.notificationName}
                  description={data.notificationDescription}
                  isToggled={data.isActive}
                  onUpdateClick={() => handleUpdateClick(data)}
                  onDeleteClick={() => handleDeleteClick(data.id || data._id)}
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={handleBack} disabled={currentPage === 1}>
              <ArrowBackIos />
            </IconButton>
            <span style={{ margin: '0 5px' }}>
              {currentPage} of {TilesData?.totalPages}
            </span>
            <IconButton
              onClick={handleNext}
              disabled={currentPage === TilesData?.totalPages}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
          {/* Display the total number of Notifications */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, textAlign: 'center' }}>
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
            message='Update Notification'
            initialName={selectedNotificationData.notificationName}
            initialDescription={
              selectedNotificationData.notificationDescription
            }
            title={'Edit Notification'}
          />
        )}
      </Dialog>

      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={1300}
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
          autoHideDuration={1300}
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
    </>
  );
};

export default Notifications;
