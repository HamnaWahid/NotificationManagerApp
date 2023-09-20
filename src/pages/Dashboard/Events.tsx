import React, { useState } from 'react';
import Tile from '../../common/Tiles/Tile';
import { Slide, Paper, Grid, IconButton, Dialog } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  useEvents,
  deleteEvent,
  deactivateEvent,
  updateEvent,
} from '../../containers/EventGrid';
import EventFormComponent from '../../common/Form/EventFormComponent';
import { useQueryClient } from '@tanstack/react-query';
import './Tiles.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface EventData {
  isActive: boolean;
  id: number;
  _id: string;
  eventName: string;
  eventDescription: string;
  dateCreated: string;
  dateUpdated: string;
}

interface EventsProps {
  searchTerm: string;
  clickedAppId: string | number;
  onEventTileClick: (eventId: string | number, eventName: string) => void;
  sortBy: string;
  sortOrder: string;
  isActive: boolean | null; // Add isActive prop
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const pageSize = 6;

const Events: React.FC<EventsProps> = ({
  searchTerm,
  clickedAppId,
  onEventTileClick,
  sortBy,
  sortOrder,
  isActive,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedEventData, setSelectedEventData] = useState<EventData | null>(
    null
  );
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [clickedTileIds, setClickedTileIds] = useState<Set<string | number>>(
    new Set()
  );

  const {
    data: TilesData,
    isLoading,
    isError,
  } = useEvents(
    clickedAppId,
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
        'events',
        clickedAppId,
        currentPage + 1,
        pageSize,
      ]);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      queryClient.invalidateQueries([
        'events',
        clickedAppId,
        currentPage - 1,
        pageSize,
      ]);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUpdateClick = (data: EventData) => {
    setSelectedEventData(data);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpdateAction = async (formData: {
    eventName: string;
    eventDescription: string;
  }) => {
    if (selectedEventData) {
      try {
        await updateEvent(
          selectedEventData.id || selectedEventData._id,
          formData
        );
        queryClient.invalidateQueries([
          'events',
          clickedAppId,
          currentPage,
          pageSize,
          searchTerm,
        ]);
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating event:', error);
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

  const handleDeleteClick = async (eventId: string | number) => {
    try {
      await deleteEvent(eventId);
      queryClient.invalidateQueries([
        'events',
        clickedAppId,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error('Error deleting event:', error);
      setAlertMessage(
        `Error deleting notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const handleToggleClick = async (eventId: string | number) => {
    try {
      await deactivateEvent(eventId);
      queryClient.invalidateQueries([
        'events',
        clickedAppId,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error('Error deactivating event:', error);
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
    const newClickedTileIds = new Set(clickedTileIds);
    newClickedTileIds.clear();
    newClickedTileIds.add(tileId);
    setClickedTileIds(newClickedTileIds);

    const selectedEvent = TilesData?.events.find(
      (event: EventData) => event.id === tileId || event._id === tileId
    );
    if (selectedEvent) {
      onEventTileClick(tileId, selectedEvent.eventName);
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
    setAlertSeverity('error');
    setShowAlert(true);
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className='events'>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={2} className='gridcontainer'>
            {TilesData?.events?.map((data: EventData) => (
              <Grid item xs={12} sm={6} md={4} key={data.id || data._id}>
                <Tile
                  Id={data.id || data._id}
                  title={data.eventName}
                  description={data.eventDescription}
                  dateCreated={data.dateCreated}
                  dateUpdated={data.dateUpdated}
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
          <div style={{ flex: 1, textAlign: 'center' }}>
            Events: {TilesData?.totalEvents}
          </div>
        </Paper>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {selectedEventData && (
          <EventFormComponent
            onCancel={handleCloseDialog}
            onSubmit={handleUpdateAction}
            message='Update Event'
            initialName={selectedEventData.eventName}
            initialDescription={selectedEventData.eventDescription}
            title={'Edit Event'}
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

export default Events;
