import { useState } from 'react';
import AppTile from '../../components/Apps/AppTile';
import './Dashboard.css';
import { Slide, MobileStepper, Paper } from '@mui/material';

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

const pageSize = 3;

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [appTilesState, setAppTilesState] = useState(
    appTilesData.map(() => false) // Initialize all tiles as not toggled
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const maxSteps = Math.ceil(appTilesData.length / pageSize);

  const startIndex = activeStep * pageSize;
  const endIndex = Math.min(startIndex + pageSize, appTilesData.length);
  const displayedAppTiles = appTilesData.slice(startIndex, endIndex);

  const toggleAppTile = (index: number) => {
    const updatedAppTilesState = [...appTilesState];
    updatedAppTilesState[index] = !updatedAppTilesState[index];
    setAppTilesState(updatedAppTilesState);
  };

  return (
    <div className='dashboard'>
      <Slide direction='left' in={true} mountOnEnter unmountOnExit>
        <div className='app-tiles'>
          {displayedAppTiles.map((data, index) => (
            <div className='app-tile' key={index}>
              <AppTile
                title={data.title}
                description={data.description}
                onUpdateClick={() => {}}
                onDeleteClick={() => {}}
                onToggleClick={() => toggleAppTile(index)} // Toggle the tile
                isToggled={appTilesState[index]} // Pass the toggled state
              />
            </div>
          ))}
        </div>
      </Slide>

      <Paper elevation={1} square>
        <MobileStepper
          variant='dots'
          steps={maxSteps}
          position='static'
          activeStep={activeStep}
          nextButton={
            <button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
            </button>
          }
          backButton={
            <button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </button>
          }
        />
      </Paper>
    </div>
  );
};

export default Dashboard;
