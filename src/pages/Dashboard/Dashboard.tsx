// import React, { useEffect, useState } from "react";
// import AppTile from "../../common/Apps/AppTile";
// import "./Dashboard.css";
// import { Slide, Paper, Grid, IconButton, Dialog } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import {
//   useApplications,
//   deleteApplication,
//   deactivateApplication,
//   updateApplication,
// } from "../../containers/AppTiles";
// import FormComponent from "../../common/Form/FormComponent";
// import { useQueryClient } from "@tanstack/react-query";

// // Define a TypeScript interface for the application data
// interface ApplicationData {
//   isActive: boolean;
//   id: number;
//   _id: string;
//   appName: string;
//   appDescription: string;
// }

// interface DashboardProps {
//   searchTerm: string;
//   onSet: (applicationId: string | number, appName: string) => void;
// }

// const pageSize = 4;

// const Dashboard: React.FC<DashboardProps> = ({ searchTerm, onSet }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [selectedAppData, setSelectedAppData] =
//     useState<ApplicationData | null>(null);

//   const [currentApplicationId, setCurrentApplicationId] = useState<
//     string | number
//   >("");

//   const [currentAppName, setCurrentAppName] = useState<string>("");

//   useEffect(() => {
//     if (currentApplicationId && currentAppName) {
//       onSet(currentApplicationId, currentAppName);
//     }
//   }, [currentApplicationId, currentAppName, onSet]);

//   const {
//     data: appTilesData,
//     isLoading,
//     isError,
//   } = useApplications(currentPage, pageSize, searchTerm);

//   const queryClient = useQueryClient();

//   const handleNext = () => {
//     if (currentPage < appTilesData.totalPages) {
//       queryClient.invalidateQueries([
//         "applications",
//         currentPage + 1,
//         pageSize,
//       ]);
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentPage > 1) {
//       queryClient.invalidateQueries([
//         "applications",
//         currentPage - 1,
//         pageSize,
//       ]);
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleUpdateClick = (data: ApplicationData) => {
//     setSelectedAppData(data);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleUpdateAction = async (formData: {
//     appName: string;
//     appDescription: string;
//   }) => {
//     if (selectedAppData) {
//       try {
//         await updateApplication(
//           selectedAppData.id || selectedAppData._id,
//           formData
//         );
//         queryClient.invalidateQueries(["applications", currentPage, pageSize]);
//         handleCloseDialog();
//       } catch (error) {
//         console.error("Error updating application:", error);
//       }
//     }
//   };

//   const handleDeleteClick = async (applicationId: string | number) => {
//     try {
//       await deleteApplication(applicationId);
//       queryClient.invalidateQueries(["applications", currentPage, pageSize]);
//     } catch (error) {
//       console.error("Error deleting application:", error);
//     }
//   };

//   const handleToggleClick = async (applicationId: string | number) => {
//     try {
//       await deactivateApplication(applicationId);
//       queryClient.invalidateQueries(["applications", currentPage, pageSize]);
//     } catch (error) {
//       console.error("Error deactivating application:", error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <>
//       <div className="dashboard">
//         <Slide direction="left" in={true} mountOnEnter unmountOnExit>
//           <Grid container spacing={2}>
//             {appTilesData?.applications.map((data: ApplicationData) => (
//               <Grid item xs={12} sm={6} md={3} key={data.id || data._id}>
//                 <AppTile
//                   applicationId={data.id || data._id}
//                   title={data.appName}
//                   description={data.appDescription}
//                   isToggled={data.isActive}
//                   onUpdateClick={() => handleUpdateClick(data)}
//                   onDeleteClick={() => handleDeleteClick(data.id || data._id)}
//                   onToggleClick={() => handleToggleClick(data.id || data._id)}
//                   onSelected={() => {
//                     setCurrentApplicationId(data.id || data._id);
//                     setCurrentAppName(data.appName);
//                   }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Slide>
//         <Paper elevation={1} square>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <IconButton onClick={handleBack} disabled={currentPage === 1}>
//               <ArrowBackIos />
//             </IconButton>
//             <span style={{ margin: "0 5px" }}>
//               {currentPage} of {appTilesData?.totalPages}
//             </span>
//             <IconButton
//               onClick={handleNext}
//               disabled={currentPage === appTilesData?.totalPages}
//             >
//               <ArrowForwardIos />
//             </IconButton>
//           </div>
//         </Paper>
//       </div>

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
//         {selectedAppData && (
//           <FormComponent
//             onCancel={handleCloseDialog}
//             onSubmit={handleUpdateAction}
//             message="Update App"
//             initialName={selectedAppData.appName}
//             initialDescription={selectedAppData.appDescription}
//             title={"Edit Application"}
//           />
//         )}
//       </Dialog>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import AppTile from "../../common/Apps/AppTile";
import "./Dashboard.css";
import { Slide, Paper, Grid, IconButton, Dialog } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  useApplications,
  deleteApplication,
  deactivateApplication,
  updateApplication,
} from "../../containers/AppTiles";
import FormComponent from "../../common/Form/FormComponent";
import { useQueryClient } from "@tanstack/react-query";

// Define a TypeScript interface for the application data
interface ApplicationData {
  isActive: boolean;
  id: number;
  _id: string;
  appName: string;
  appDescription: string;
}

interface DashboardProps {
  searchTerm: string;
  onSet: (applicationId: string | number, appName: string) => void;
}

const pageSize = 4;

const Dashboard: React.FC<DashboardProps> = ({ searchTerm, onSet }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedAppData, setSelectedAppData] =
    useState<ApplicationData | null>(null);

  const [clickedApplicationIds, setClickedApplicationIds] = useState<
    Set<string | number>
  >(new Set());

  const {
    data: appTilesData,
    isLoading,
    isError,
  } = useApplications(currentPage, pageSize, searchTerm);

  const queryClient = useQueryClient();

  const handleNext = () => {
    if (currentPage < appTilesData.totalPages) {
      queryClient.invalidateQueries([
        "applications",
        currentPage + 1,
        pageSize,
      ]);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      queryClient.invalidateQueries([
        "applications",
        currentPage - 1,
        pageSize,
      ]);
      setCurrentPage(currentPage - 1);
    }
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
        queryClient.invalidateQueries(["applications", currentPage, pageSize]);
        handleCloseDialog();
      } catch (error) {
        console.error("Error updating application:", error);
      }
    }
  };

  const handleDeleteClick = async (applicationId: string | number) => {
    try {
      await deleteApplication(applicationId);
      queryClient.invalidateQueries(["applications", currentPage, pageSize]);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleToggleClick = async (applicationId: string | number) => {
    try {
      await deactivateApplication(applicationId);
      queryClient.invalidateQueries(["applications", currentPage, pageSize]);
    } catch (error) {
      console.error("Error deactivating application:", error);
    }
  };

  const handleAppTileClick = (
    applicationId: string | number,
    appName: string
  ) => {
    // Update the clicked application IDs
    const newClickedApplicationIds = new Set(clickedApplicationIds);
    newClickedApplicationIds.clear(); // Clear the previous set
    newClickedApplicationIds.add(applicationId); // Add the clicked application ID
    setClickedApplicationIds(newClickedApplicationIds);

    // Call the onSet function
    onSet(applicationId, appName);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="dashboard">
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            {appTilesData?.applications.map((data: ApplicationData) => (
              <Grid item xs={12} sm={6} md={3} key={data.id || data._id}>
                <AppTile
                  applicationId={data.id || data._id}
                  title={data.appName}
                  description={data.appDescription}
                  isToggled={data.isActive}
                  onUpdateClick={() => handleUpdateClick(data)}
                  onDeleteClick={() => handleDeleteClick(data.id || data._id)}
                  onToggleClick={() => handleToggleClick(data.id || data._id)}
                  onSelected={() =>
                    handleAppTileClick(data.id || data._id, data.appName)
                  }
                  isClicked={clickedApplicationIds.has(data.id || data._id)}
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
            <IconButton onClick={handleBack} disabled={currentPage === 1}>
              <ArrowBackIos />
            </IconButton>
            <span style={{ margin: "0 5px" }}>
              {currentPage} of {appTilesData?.totalPages}
            </span>
            <IconButton
              onClick={handleNext}
              disabled={currentPage === appTilesData?.totalPages}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        </Paper>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {selectedAppData && (
          <FormComponent
            onCancel={handleCloseDialog}
            onSubmit={handleUpdateAction}
            message="Update App"
            initialName={selectedAppData.appName}
            initialDescription={selectedAppData.appDescription}
            title={"Edit Application"}
          />
        )}
      </Dialog>
    </>
  );
};

export default Dashboard;
