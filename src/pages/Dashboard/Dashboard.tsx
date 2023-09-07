import { useState } from "react";
import AppTile from "../../components/Apps/AppTile";
import "./Dashboard.css";
import { Slide, MobileStepper, Paper, Grid } from "@mui/material";

const appTilesData = [
  { title: "App1", description: "Onga Bongaaaaa" },
  { title: "App2", description: "Another App" },
  { title: "App3", description: "Yet Another App" },
  { title: "App4", description: "Some App" },
  { title: "App5", description: "Yet Another App" },
  { title: "App6", description: "Yet Another App" },
  { title: "App7", description: "Yet Another App" },
  { title: "App8", description: "Yet Another App" },
  { title: "App9", description: "Yet Another App" },
];

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const maxSteps = Math.ceil(appTilesData.length / 6); // Display 3 tiles per row on small screens

  const startIndex = activeStep * 3;
  const endIndex = Math.min(startIndex + 3, appTilesData.length);
  const displayedAppTiles = appTilesData.slice(startIndex, endIndex);

  return (
    <div className="dashboard">
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Grid container spacing={2}>
          {displayedAppTiles.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AppTile
                title={data.title}
                description={data.description}
                onUpdateClick={() => {}}
                onDeleteClick={() => {}}
                onToggleClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                isToggled={false}
              />
            </Grid>
          ))}
        </Grid>
      </Slide>

      <Paper elevation={1} square>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
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
