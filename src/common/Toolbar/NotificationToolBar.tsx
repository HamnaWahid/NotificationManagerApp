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
import {
  Search,
  Sort,
  SortByAlpha,
  Add,
  FilterAlt,
  MoreVert,
} from "@mui/icons-material";
import "./ToolbarStyles.css";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import Hidden from "@mui/material/Hidden"; // Import Hidden from Material-UI

interface NotificationToolbarHeaderProps {
  title: string;
  clickedEventId: string | number;
  clickedEventName: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const NotificationToolbarHeader: React.FC<NotificationToolbarHeaderProps> = ({
  title,
  clickedEventId,
  clickedEventName,
  searchTerm,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setIsActive,
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder("asc");
    handleClose();
  };
  const handleSortOrderClick = (option: string) => {
    setSortOrder(option);
    setSortOrder("asc");
    handleClose();
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
          {clickedEventName}
        </span>
      </Typography>

      {/* Show all buttons and input on larger screens */}
      <Hidden smDown>
        <div style={{ position: "relative" }}>
          <Tooltip title="Search">
            <IconButton>
              <Search />
            </IconButton>
          </Tooltip>
          <InputBase
            placeholder="Search"
            style={{
              color: "#3f51b5",
              marginLeft: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "8px",
            }}
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
            <MenuItem onClick={() => handleSortOptionClick("notificationName")}>
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
              Ascending
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
              onClick={() => {
                navigate(`/add-notification/${clickedEventId}`);
              }}
            >
              <Add />
            </Button>
          </Tooltip>
        </div>
      </Hidden>

      {/* Show a menu button on screens smaller than tablet */}
      <Hidden mdUp>
        <div style={{ position: "relative" }}>
          <Tooltip title="Search">
            <InputBase
              placeholder="Search"
              style={{
                color: "#3f51b5",
                marginLeft: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "16px",
                padding: "8px",
              }}
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
          <MenuItem>
            <Button
              size="small"
              onClick={() => {
                navigate(`/add-notification/${clickedEventId}`);
              }}
            >
              <Add />
            </Button>
          </MenuItem>

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
              <MenuItem
                onClick={() => handleSortOptionClick("notificationName")}
              >
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
    </Toolbar>
  );
};

export default NotificationToolbarHeader;
