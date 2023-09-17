import React, { useState } from 'react';
import Tile from '../../common/Tiles/Tile';
import { Slide, Paper, Grid, IconButton, Dialog } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
  useNotifications,
  deleteNotification,
  deactivateNotification,
  updateNotification,
} from '../../containers/NotificationGrid'; // Update the import path
import NotificationFormComponent from '../../common/Form/NotificationFormComponent';
import { useQueryClient } from '@tanstack/react-query';
import './Tiles.css';

interface NotificationData {
  isActive: boolean;
  id: number;
  _id: string;
  notificationName: string; // Update the property name
  notificationDescription: string; // Update the property name
}

interface NotificationsProps {
  searchTerm: string;
  clickedEventId: string | number; // Update the property name
  onNotificationTileClick: (notificationId: string | number) => void; // Update the property name
}

const pageSize = 6;

const Notifications: React.FC<NotificationsProps> = ({
  searchTerm,
  clickedEventId, // Update the property name
  onNotificationTileClick, // Update the property name
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedNotificationData, setSelectedNotificationData] =
    useState<NotificationData | null>(null);

  const {
    data: TilesData,
    isLoading,
    isError,
  } = useNotifications(clickedEventId, currentPage, pageSize, searchTerm); // Update the function and parameters

  const queryClient = useQueryClient();

  const handleNext = () => {
    if (currentPage < TilesData.totalPages) {
      queryClient.invalidateQueries([
        'notifications',
        clickedEventId, // Update the parameter
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
        clickedEventId, // Update the parameter
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
    notificationName: string; // Update the property name
    notificationDescription: string; // Update the property name
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
        ]);
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating notification:', error);
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
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
                  title={data.notificationName} // Update the property name
                  description={data.notificationDescription} // Update the property name
                  isToggled={data.isActive}
                  onUpdateClick={() => handleUpdateClick(data)}
                  onDeleteClick={() => handleDeleteClick(data.id || data._id)}
                  onToggleClick={() => handleToggleClick(data.id || data._id)}
                  onTileClick={() =>
                    onNotificationTileClick(data.id || data._id)
                  } // Pass the Id to the parent component
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
        </Paper>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {selectedNotificationData && (
          <NotificationFormComponent
            onCancel={handleCloseDialog}
            onSubmit={handleUpdateAction}
            message='Update Notification' // Update the message
            initialName={selectedNotificationData.notificationName} // Update the property name
            initialDescription={
              selectedNotificationData.notificationDescription
            } // Update the property name
            title={'Edit Notification'} // Update the title
          />
        )}
      </Dialog>
    </>
  );
};

export default Notifications;
