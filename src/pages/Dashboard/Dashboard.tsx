import React, { Key, useState } from 'react';
import AppTile from '../../components/Apps/AppTile';
import './Dashboard.css';
import { Slide, Paper, Grid, IconButton, Dialog } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
  useApplications,
  deleteApplication,
  deactivateApplication,
  updateApplication,
} from '../../containers/AppTiles';
import FormComponent from '../../common/Form/FormComponent';

// Define a TypeScript interface for the application data
interface ApplicationData {
  id: number;
  _id: string;
  appName: string;
  appDescription: string;
}

const tilesPerRow = 4;

const Dashboard: React.FC = () => {
  const { data: appTilesData, isLoading, isError } = useApplications();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedAppData, setSelectedAppData] =
    useState<ApplicationData | null>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdateClick = (data: ApplicationData) => {
    setSelectedAppData(data);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUpdateAction = async (formData: {
    appName: string;
    appDescription: string;
  }) => {
    if (selectedAppData) {
      try {
        await updateApplication(
          selectedAppData.id || selectedAppData._id,
          formData
        );
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating application:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  };

  const handleDeleteClick = async (applicationId: string | number) => {
    try {
      await deleteApplication(applicationId);
      // You can add logic to update the UI or refresh the application list here
    } catch (error) {
      console.error('Error deleting application:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleToggleClick = async (applicationId: string | number) => {
    try {
      await deactivateApplication(applicationId);
    } catch (error) {
      console.error('Error deactivating application:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const maxSteps = Math.ceil(appTilesData.length / tilesPerRow);
  const startIndex = activeStep * tilesPerRow;
  const endIndex = Math.min(startIndex + tilesPerRow, appTilesData.length);
  const displayedAppTiles = appTilesData.slice(startIndex, endIndex);

  return (
    <>
      <div className='dashboard'>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            {displayedAppTiles.map(
              (data: ApplicationData, index: Key | null | undefined) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <AppTile
                    applicationId={data.id || data._id}
                    title={data.appName}
                    description={data.appDescription}
                    isToggled={true}
                    onUpdateClick={() => handleUpdateClick(data)}
                    onDeleteClick={() => handleDeleteClick(data.id || data._id)}
                    onToggleClick={() => handleToggleClick(data.id || data._id)}
                  />
                </Grid>
              )
            )}
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
            <IconButton onClick={handleBack} disabled={activeStep === 0}>
              <ArrowBackIos />
            </IconButton>
            <span style={{ margin: '0 5px' }}>
              {activeStep + 1} of {maxSteps}
            </span>
            <IconButton
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        </Paper>
      </div>

      {/* Dialog for Update */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {selectedAppData && (
          <FormComponent
            onCancel={handleCloseDialog}
            onSubmit={handleUpdateAction}
            message='Update App'
            initialName={selectedAppData.appName}
            initialDescription={selectedAppData.appDescription}
            title={'Edit Application'}
          />
        )}
      </Dialog>
    </>
  );
};

export default Dashboard;
