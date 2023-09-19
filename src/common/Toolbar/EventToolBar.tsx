import React, { useState } from "react";
import useHandleAddEvent from "./handleAddEvent";
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
} from "@mui/material";
import { Search, Sort, SortByAlpha, Add, FilterAlt } from "@mui/icons-material";
import EventFormComponent from "../Form/EventFormComponent"; // Import the EventFormComponent
import "./ToolbarStyles.css";
import { useQueryClient } from "@tanstack/react-query";
import Tooltip from "@mui/material/Tooltip";

interface EventToolbarHeaderProps {
  title: string;
  clickedAppId: string | number;
  clickedAppName: string; // Add clickedAppName to the props
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string; // Add sortBy prop
  setSortBy: React.Dispatch<React.SetStateAction<string>>; // Add setSortBy prop
  sortOrder: string; // Add sortOrder prop
  setSortOrder: React.Dispatch<React.SetStateAction<string>>; // Add setSortOrder prop
  isActive: boolean | null; // Add isActive prop
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>; // Add setIsActive prop
}

const EventToolbarHeader: React.FC<EventToolbarHeaderProps> = ({
  title,
  clickedAppId,
  clickedAppName,
  searchTerm,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setIsActive, // Add isActive and setIsActive props
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<null | HTMLElement>(null); // Add state for status menu
  const queryClient = useQueryClient();

  const handleClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleClickSortByAlpha = (event: React.MouseEvent<HTMLElement>) => {
    setAlphaSortAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSortAnchorEl(null);
    setAlphaSortAnchorEl(null);
    setStatusMenuAnchorEl(null); // Add this line to reset statusMenuAnchorEl
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder("asc"); // Reset to default ascending order when a new sort option is selected
    handleClose();

    // Update the query with the new sorting options
  };
  // Custom hook to handle adding an application
  const handleAddEvent = useHandleAddEvent();

  const handleFormSubmit = (formData: {
    eventName: string;
    eventDescription: string;
  }) => {
    // Add the clickedAppId to the formData object
    const formDataWithAppId = {
      ...formData,
      applicationId: clickedAppId,
    };

    handleAddEvent(formDataWithAppId);
    setOpenDialog(false); // Close the dialog after submission
  };
  const handleClickStatusFilter = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuAnchorEl(event.currentTarget);
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
      <div style={{ position: "relative" }}>
        <Tooltip title="Search">
          <IconButton>
            <Search />
          </IconButton>
        </Tooltip>
        <InputBase
          placeholder="Search"
          style={{ marginLeft: "10px" }}
          inputProps={{ "aria-label": "search" }}
          defaultValue={searchTerm}
          onChange={(e) => {
            const v = e.target.value;

            if (v.length >= 3) {
              setSearchTerm(v);
              queryClient.invalidateQueries(["events", searchTerm]);
            }

            if (v.length === 0) {
              setSearchTerm("");
            }
          }}
        />
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
          <MenuItem onClick={() => handleSortOptionClick("asc")}>
            Ascending
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick("desc")}>
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
    </Toolbar>
  );
};

export default EventToolbarHeader;
