import React, { useState } from "react";
import useHandleAddEvent from "./handleAddEvent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  Hidden,
} from "@mui/material";
import {
  Sort,
  SortByAlpha,
  Add,
  FilterAlt,
  MoreVert,
} from "@mui/icons-material";
import EventFormComponent from "../Form/EventFormComponent";
import "./ToolbarStyles.css";
import { useQueryClient } from "@tanstack/react-query";
import Tooltip from "@mui/material/Tooltip";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface EventToolbarHeaderProps {
  title: string;
  page: number;
  clickedAppId: string | number;
  clickedAppName: string;
  searchTerm: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const EventToolbarHeader: React.FC<EventToolbarHeaderProps> = ({
  title,
  clickedAppId,
  clickedAppName,
  page,
  setPage,
  searchTerm,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setIsActive,
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleClickSortByAlpha = (event: React.MouseEvent<HTMLElement>) => {
    setAlphaSortAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSortAnchorEl(null);
    setAlphaSortAnchorEl(null);
    setStatusMenuAnchorEl(null);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder("asc");
    handleClose();
  };
  const handleSortOrderClick = (option: string) => {
    setSortOrder(option);
    handleClose();
  };
  const handleAddEvent = useHandleAddEvent();

  const handleFormSubmit = async (formData: {
    eventName: string;
    eventDescription: string;
  }) => {
    try {
      const formDataWithAppId = {
        ...formData,
        applicationId: clickedAppId,
      };

      await handleAddEvent(formDataWithAppId);
      setOpenDialog(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error adding event:", error);
      setAlertMessage(
        `Error adding event: ${
          error.response?.data.error || error.response.data
        }`
      );
      setAlertSeverity("error");
      setShowAlert(true);
      // You can handle the error state or other logic here if needed
    }
  };

  const handleClickStatusFilter = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuAnchorEl(event.currentTarget);
  };
  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  return (
    <Toolbar className="curved-appbar toolbar-header">
      <Typography
        variant="h6"
        style={{ flexGrow: 1, color: "#333", fontWeight: "bold" }}
      >
        {title} -{" "}
        <span
          style={{
            fontSize: "17px",
            color: "#3f51b5",
          }}
        >
          {clickedAppName} {/* Use clickedEventName */}
        </span>
      </Typography>

      {/* Show all buttons and input on larger screens */}
      <Hidden smDown>
        <div style={{ position: "relative" }}>
          <Tooltip title="Search">
            <InputBase
              placeholder="Search"
              style={{ marginLeft: "10px" }}
              inputProps={{ "aria-label": "search" }}
              defaultValue={searchTerm}
              onChange={(e) => {
                const v = e.target.value;

                if (v.length >= 3) {
                  setPage(1);
                  setSearchTerm(v);
                  queryClient.invalidateQueries(["events", page, searchTerm]);
                }

                if (v.length === 0) {
                  setPage(1);
                  setSearchTerm("");
                  queryClient.invalidateQueries(["events", searchTerm]);
                }
              }}
            />
          </Tooltip>
        </div>

        <div>
          <div style={{ display: "flex" }}>
            <Tooltip title="Sort By">
              <IconButton onClick={handleClickSortByAlpha}>
                <SortByAlpha />
              </IconButton>
            </Tooltip>
          </div>
          <Menu
            anchorEl={alphaSortAnchorEl}
            keepMounted
            open={Boolean(alphaSortAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSortOptionClick("eventName")}>
              Sort by Name
            </MenuItem>
            <MenuItem onClick={() => handleSortOptionClick("dateCreated")}>
              Sort by Date
            </MenuItem>
            <MenuItem onClick={() => handleSortOptionClick("isActive")}>
              Sort by Active Status
            </MenuItem>
          </Menu>
        </div>

        <div>
          <Tooltip title="Sort Order">
            <IconButton onClick={handleClickSort}>
              <Sort />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={sortAnchorEl}
            keepMounted
            open={Boolean(sortAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSortOrderClick("asc")}>
              Ascendings
            </MenuItem>
            <MenuItem onClick={() => handleSortOrderClick("desc")}>
              Descending
            </MenuItem>
          </Menu>
        </div>

        <div>
          <Tooltip title="Status Filter">
            <IconButton onClick={handleClickStatusFilter}>
              <FilterAlt />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={statusMenuAnchorEl}
            keepMounted
            open={Boolean(statusMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setIsActive(true);
                handleClose();
              }}
            >
              Active
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsActive(false);
                handleClose();
              }}
            >
              Inactive
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsActive(null);
                handleClose();
              }}
            >
              All
            </MenuItem>
          </Menu>
        </div>
        <div>
          <Tooltip title="Add">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{
                marginRight: "5px",
                color: "#3f51b5",
              }}
              onClick={handleAddClick}
            >
              <Add />
            </Button>
          </Tooltip>
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <EventFormComponent
              title="Add Event"
              onCancel={handleDialogClose}
              onSubmit={handleFormSubmit}
            />
          </Dialog>
        </div>
      </Hidden>

      {/* Show a menu button on screens smaller than tablet */}
      <Hidden mdUp>
        <div style={{ position: "relative" }}>
          <Tooltip title="Search">
            <InputBase
              placeholder="Search"
              style={{ marginLeft: "10px" }}
              inputProps={{ "aria-label": "search" }}
              defaultValue={searchTerm}
              onChange={(e) => {
                const v = e.target.value;

                if (v.length >= 3) {
                  setPage(1);
                  setSearchTerm(v);
                  queryClient.invalidateQueries(["events", page, searchTerm]);
                }

                if (v.length === 0) {
                  setPage(1);
                  setSearchTerm("");
                  queryClient.invalidateQueries(["events", searchTerm]);
                }
              }}
            />
          </Tooltip>
        </div>
        <Tooltip title="Menu">
          <IconButton onClick={handleMenuButtonClick}>
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={() => setMenuAnchorEl(null)}
        >
          {/* Remove the duplicated "Add" button */}
          <MenuItem>
            <Button size="small" onClick={handleAddClick}>
              <Add />
            </Button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <EventFormComponent
                title="Add Event"
                onCancel={handleDialogClose}
                onSubmit={handleFormSubmit}
              />
            </Dialog>
          </MenuItem>

          {/* Add a horizontal menu for "Sort By" */}
          <MenuItem>
            <IconButton onClick={handleClickSortByAlpha}>
              <SortByAlpha />
            </IconButton>
            <Menu
              anchorEl={alphaSortAnchorEl}
              keepMounted
              open={Boolean(alphaSortAnchorEl)}
              onClose={handleClose}
              style={{ marginTop: "8px" }}
            >
              <MenuItem onClick={() => handleSortOptionClick("eventName")}>
                Sort by Name
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionClick("dateCreated")}>
                Sort by Date
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionClick("isActive")}>
                Sort by Active Status
              </MenuItem>
            </Menu>
          </MenuItem>

          {/* sorting */}
          <MenuItem>
            <IconButton onClick={handleClickSort}>
              <Sort />
            </IconButton>
            <Menu
              anchorEl={sortAnchorEl}
              keepMounted
              open={Boolean(sortAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleSortOptionClick("asc")}>
                Ascending
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionClick("desc")}>
                Descending
              </MenuItem>
            </Menu>
          </MenuItem>

          {/* status filter */}
          <MenuItem>
            <IconButton onClick={handleClickStatusFilter}>
              <FilterAlt />
            </IconButton>
            <Menu
              anchorEl={statusMenuAnchorEl}
              keepMounted
              open={Boolean(statusMenuAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setIsActive(true);
                  handleClose();
                }}
              >
                Active
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsActive(false);
                  handleClose();
                }}
              >
                Inactive
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsActive(null);
                  handleClose();
                }}
              >
                All
              </MenuItem>
            </Menu>
          </MenuItem>
        </Menu>
      </Hidden>

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
          style={{
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
    </Toolbar>
  );
};

export default EventToolbarHeader;
