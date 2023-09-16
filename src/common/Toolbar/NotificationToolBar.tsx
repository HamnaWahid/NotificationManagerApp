import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Search, Sort, SortByAlpha, Add } from "@mui/icons-material";
import "./ToolbarStyles.css";
import { useQueryClient } from "@tanstack/react-query";

interface NotificationToolbarHeaderProps {
  title: string;
  clickedEventId: string | number; // Changed to clickedEventId
  clickedEventName: string; // Added clickedEventName
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const NotificationToolbarHeader: React.FC<NotificationToolbarHeaderProps> = ({
  title,
  clickedEventId,
  clickedEventName,
  searchTerm,
  setSearchTerm,
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
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
  };

  return (
    <Toolbar className="curved-appbar toolbar-header">
      <Typography variant="h6" style={{ flexGrow: 1, color: "grey" }}>
        {title} -{" "}
        <span
          style={{
            fontSize: "12px",
            color: "#3f51b5",
            fontWeight: "bold",
          }}
        >
          {clickedEventName} {/* Use clickedEventName */}
        </span>
      </Typography>
      <div style={{ position: "relative" }}>
        <IconButton>
          <Search />
        </IconButton>
        <InputBase
          placeholder="Search"
          style={{ color: "#3f51b5", marginLeft: "10px" }}
          inputProps={{ "aria-label": "search" }}
          defaultValue={searchTerm}
          onChange={(e) => {
            const v = e.target.value;

            if (v.length >= 3) {
              setSearchTerm(v);
              queryClient.invalidateQueries(["notifications", searchTerm]);
            }

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
        <Menu
          anchorEl={alphaSortAnchorEl}
          keepMounted
          open={Boolean(alphaSortAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
          <MenuItem onClick={handleClose}>Sort by Date</MenuItem>
          <MenuItem onClick={handleClose}>Sort by Size</MenuItem>
        </Menu>
      </div>
      <div>
        <IconButton onClick={handleClickSort}>
          <Sort />
        </IconButton>
        <Menu
          anchorEl={sortAnchorEl}
          keepMounted
          open={Boolean(sortAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Ascending</MenuItem>
          <MenuItem onClick={handleClose}>Descending</MenuItem>
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
          onClick={() => {}}
        >
          <Add />
        </Button>
      </div>
    </Toolbar>
  );
};

export default NotificationToolbarHeader;
