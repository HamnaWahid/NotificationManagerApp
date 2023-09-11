import React, { Key, useState } from 'react';
import AppTile from '../../components/Apps/AppTile';
import './Dashboard.css';
import { Slide, Paper, Grid, IconButton, Dialog } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useApplications } from '../../containers/AppTiles';
import FormComponent from '../../common/Form/FormComponent'; // Import the FormComponent

const tilesPerRow = 4;

const Dashboard: React.FC = () => {
  const { data: appTilesData, isLoading, isError } = useApplications();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false); // State for dialog
  const [selectedAppTitle, setSelectedAppTitle] = useState<string>(''); // State to store selected app title

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdateClick = (appName: string) => {
    setSelectedAppTitle(appName); // Set the selected app title
    setDialogOpen(true); // Open the dialog when "Update" is clicked
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handleUpdateAction = () => {
    // Implement the logic for updating the app using formData
    // Close the dialog after updating
    handleCloseDialog();
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
              (
                data: { appName: string; appDescription: string },
                index: Key | null | undefined
              ) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <AppTile
                    title={data.appName}
                    description={data.appDescription}
                    onUpdateClick={() => handleUpdateClick(data.appName)} // Handle Update click with appName
                    onDeleteClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    onToggleClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    isToggled={false}
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
        <FormComponent
          onCancel={handleCloseDialog}
          onSubmit={handleUpdateAction}
          message='Update App'
          title={'edit application'} // Pass the selected app title
        />
      </Dialog>
    </>
  );
};

export default Dashboard;
