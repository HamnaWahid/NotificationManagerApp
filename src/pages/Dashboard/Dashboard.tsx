import { Key, useState } from 'react';
import AppTile from '../../components/Apps/AppTile';
import './Dashboard.css';
import { Slide, Paper, Grid, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useApplications } from '../../containers/AppTiles'; // Update with the correct path to your api.ts file

const tilesPerRow = 4; // Number of tiles to display per row

const Dashboard = () => {
  const { data: appTilesData, isLoading, isError } = useApplications();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const maxSteps = Math.ceil(appTilesData.length / tilesPerRow); // Calculate based on tilesPerRow

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
                    onUpdateClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    onDeleteClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    onToggleClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    isToggled={false} // Add other props as needed
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
    </>
  );
};

export default Dashboard;
