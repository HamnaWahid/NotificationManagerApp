import React, { useState } from "react";
import useHandleAddApplication from "./handleAddApplication";
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
import { Search, Sort, SortByAlpha, Add } from "@mui/icons-material";
import FormComponent from "../Form/FormComponent"; // Import the FormComponent

import "./ToolbarStyles.css";
import { useQueryClient } from "@tanstack/react-query";

// Update the ToolbarHeaderProps interface to include sortBy and sortOrder props
interface ToolbarHeaderProps {
  title: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string; // Add sortBy prop
  sortOrder: string; // Add sortOrder prop
  setSortBy: React.Dispatch<React.SetStateAction<string>>; // Add setSortBy prop
  setSortOrder: React.Dispatch<React.SetStateAction<string>>; // Add setSortOrder prop
}

const ToolbarHeader: React.FC<ToolbarHeaderProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  setSortBy, // Add setSortBy prop
  setSortOrder, // Add setSortOrder prop
}) => {
  // State for sorting menu and dialog
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Access the QueryClient
  const queryClient = useQueryClient();

  // Function to handle click on the "Sort" icon
  const handleClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  // Function to handle click on the "Sort by Alpha" icon
  const handleClickSortByAlpha = (event: React.MouseEvent<HTMLElement>) => {
    setAlphaSortAnchorEl(event.currentTarget);
  };

  // Function to close menus
  const handleClose = () => {
    setSortAnchorEl(null);
    setAlphaSortAnchorEl(null);
  };

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder("asc"); // Reset to default ascending order when a new sort option is selected
    handleClose();
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Custom hook to handle adding an application
  const handleAddApplication = useHandleAddApplication();

  // Function to handle form submission
  const handleFormSubmit = (formData: {
    appName: string;
    appDescription: string;
  }) => {
    handleAddApplication(formData);
    setOpenDialog(false); // Close the dialog after submission
  };
  return (
    // Toolbar component
    <Toolbar className="curved-appbar toolbar-header">
      <Typography variant="h6" style={{ flexGrow: 1, color: "grey" }}>
        {title}
      </Typography>
      <div style={{ position: "relative" }}>
        <IconButton>
          <Search />
        </IconButton>
        {/* Input for searching */}
        <InputBase
          placeholder="Search"
          style={{ color: "#3f51b5", marginLeft: "10px" }}
          inputProps={{ "aria-label": "search" }}
          defaultValue={searchTerm}
          onChange={(e) => {
            const v = e.target.value;

            // Check if the search term length is greater than or equal to 3
            if (v.length >= 3) {
              setSearchTerm(v);
              queryClient.invalidateQueries(["applications", searchTerm]);
            }

            // Reset the search term if the input is empty
            if (v.length === 0) {
              setSearchTerm("");
            }
          }}
        />
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <IconButton onClick={handleClickSortByAlpha}>
            <SortByAlpha />
          </IconButton>
        </div>
        {/* Menu for sorting by name, date, or size */}
        <Menu
          anchorEl={alphaSortAnchorEl}
          keepMounted
          open={Boolean(alphaSortAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSortOptionClick("appName")}>
            Sort by Name
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick("dateCreated")}>
            Sort by Date
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick("isActive")}>
            Sort by Status
          </MenuItem>
        </Menu>
      </div>
      <div>
        <IconButton onClick={handleClickSort}>
          <Sort />
        </IconButton>
        {/* Menu for ascending or descending sort */}
        <Menu
          anchorEl={sortAnchorEl}
          keepMounted
          open={Boolean(sortAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setSortOrder("asc");
              handleClose(); // Close the menu after setting the sort order
            }}
          >
            Ascending
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortOrder("desc");
              handleClose(); // Close the menu after setting the sort order
            }}
          >
            Descending
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginRight: "5px",
            backgroundColor: "white",
            color: "#3f51b5",
          }}
          onClick={handleAddClick}
        >
          <Add />
        </Button>
        {/* Dialog component for adding an application */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <FormComponent
            title="Add Application"
            onCancel={handleDialogClose}
            onSubmit={handleFormSubmit}
          />
        </Dialog>
      </div>
    </Toolbar>
  );
};

export default ToolbarHeader;
