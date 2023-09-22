import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import AppTile from "../../common/Apps/AppTile";
import "./Dashboard.css";
import {
  Slide,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  AlertTitle,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  useApplications,
  deleteApplication,
  deactivateApplication,
  updateApplication,
} from "../../containers/AppTiles";
import FormComponent from "../../common/Form/FormComponent";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../common/Loading";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ApplicationData {
  isActive: boolean;
  id: number;
  _id: string;
  appName: string;
  appDescription: string;
  dateCreated: string;
  dateUpdated: string;
}

interface DashboardProps {
  onSet: (applicationId: string | number, appName: string) => void;
  page: number;
  searchTerm: string; // Add searchTerm to the interface
  sortBy: string;
  sortOrder: string;
  isActive: boolean | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const pageSize = 4;

const Dashboard: React.FC<DashboardProps> = ({
  onSet,
  page,
  setPage,
  searchTerm,
  sortBy,
  sortOrder,
  isActive,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedAppData, setSelectedAppData] =
    useState<ApplicationData | null>(null);

  const [clickedApplicationIds, setClickedApplicationIds] = useState<
    Set<string | number>
  >(new Set()); //del

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteDialogData, setDeleteDialogData] =
    useState<ApplicationData | null>(null);
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      setCurrentPage(1);
      setPage(1);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      <Loading />;
      navigate("/");
    }
  }, [navigate]);

  const {
    data: appTilesData,
    isLoading,
    isError,
  } = useApplications(page, pageSize, searchTerm, sortBy, sortOrder, isActive); // Pass sortBy and sortOrder
  const queryClient = useQueryClient();
  console.log("dataaaaa checkkkkk", appTilesData);
  const handleNext = () => {
    if (page < appTilesData.totalPages) {
      queryClient.invalidateQueries([
        "applications",
        currentPage + 1,

        pageSize,
      ]);
      setPage(page + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      queryClient.invalidateQueries(["applications", page - 1, pageSize]);
      setCurrentPage(currentPage - 1);
      setPage(page - 1);
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
        setAlertMessage(
          `Error updating notification: ${
            error.response?.data.error || error.response.data
          }`
        );
        setAlertSeverity("error");
        setShowAlert(true);
      }
    }
  };
  const handleDeleteClick = async (applicationId: string | number) => {
    try {
      await deleteApplication(applicationId);
      queryClient.invalidateQueries(["applications", currentPage, pageSize]);
      setPage(1);
      // Clear the selected app's events and notifications
      setClickedApplicationIds(new Set()); //del
      onSet("", "");
    } catch (error) {
      console.error("Error deleting application:", error);
      setAlertMessage(
        `Error deleting notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  const handleToggleClick = async (applicationId: string | number) => {
    try {
      await deactivateApplication(applicationId);
      queryClient.invalidateQueries([
        "applications",
        page,
        currentPage,
        pageSize,
      ]);
    } catch (error) {
      console.error("Error deactivating application:", error);
      setAlertMessage(
        `Error deactivating notification: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  const handleAppTileClick = (
    applicationId: string | number,
    appName: string
  ) => {
    const newClickedApplicationIds = new Set(clickedApplicationIds);
    newClickedApplicationIds.clear();
    newClickedApplicationIds.add(applicationId);
    setClickedApplicationIds(newClickedApplicationIds); //del
    onSet(applicationId, appName);
  };
  // Check if there are no notifications found during a search
  if (
    searchTerm &&
    searchTerm.length >= 3 &&
    appTilesData?.applications?.length === 0
  ) {
    return (
      <Alert severity="info" variant="outlined">
        <AlertTitle>No Apps Found</AlertTitle>
        There are no apps matching your search criteria.
      </Alert>
    );
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
                  dateCreated={data.dateCreated}
                  dateUpdated={data.dateUpdated}
                  isToggled={data.isActive}
                  onUpdateClick={() => handleUpdateClick(data)}
                  onDeleteClick={() => {
                    setDeleteDialogData(data);
                    setDeleteDialogOpen(true);
                  }}
                  onToggleClick={() => handleToggleClick(data.id || data._id)}
                  onSelected={() =>
                    handleAppTileClick(data.id || data._id, data.appName)
                  }
                  isClicked={clickedApplicationIds.has(data.id || data._id)} //del
                />
              </Grid>
            ))}
          </Grid>
        </Slide>
        <Paper elevation={1} square>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <Tooltip title="Back">
                <IconButton onClick={handleBack} disabled={page === 1}>
                  <ArrowBackIos />
                </IconButton>
              </Tooltip>
              <span style={{ margin: "0 5px" }}>
                {page || 1} of {appTilesData?.totalPages || 1}
              </span>
              <Tooltip title="Next">
                <IconButton
                  onClick={handleNext}
                  disabled={page === appTilesData?.totalPages}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Tooltip>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                Applications: {appTilesData?.totalApplications}
              </div>
            </div>
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
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <div>Are you sure you want to delete the application?</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeleteClick(deleteDialogData?.id || deleteDialogData?._id);
              setDeleteDialogOpen(false);
            }}
            color="error"
          >
            Delete
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={1300}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setShowSnackbar(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={1300}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Dashboard;
