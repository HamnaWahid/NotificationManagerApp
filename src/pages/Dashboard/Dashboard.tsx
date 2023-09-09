import { useState } from 'react';
import AppTile from '../../components/Apps/AppTile';
import './Dashboard.css';
import { Slide, Paper, Grid, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Toolbar from '../../common/Toolbar/ToolBar';

const appTilesData = [
  { title: 'App1', description: 'Onga Bongaaaaa' },
  { title: 'App2', description: 'Another App' },
  { title: 'App3', description: 'Yet Another App' },
  { title: 'App4', description: 'Some App' },
  { title: 'App5', description: 'Yet Another App' },
  { title: 'App6', description: 'Yet Another App' },
  { title: 'App7', description: 'Yet Another App' },
  { title: 'App8', description: 'Yet Another App' },
  { title: 'App9', description: 'Yet Another App' },
];

const tilesPerRow = 4; // Number of tiles to display per row

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const maxSteps = Math.ceil(appTilesData.length / tilesPerRow); // Calculate based on tilesPerRow

  const startIndex = activeStep * tilesPerRow;
  const endIndex = Math.min(startIndex + tilesPerRow, appTilesData.length);
  const displayedAppTiles = appTilesData.slice(startIndex, endIndex);

  return (
    <div>
      <Toolbar title='Application' />
      <div className='dashboard'>
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            {displayedAppTiles.map((data, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <AppTile
                  title={data.title}
                  description={data.description}
                  onUpdateClick={() => {}}
                  onDeleteClick={() => {}}
                  onToggleClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  isToggled={false}
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
    </div>
  );
};

export default Dashboard;
