import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { Search, Sort, SortByAlpha, Add, FilterAlt } from '@mui/icons-material';
import './ToolbarStyles.css';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';

interface NotificationToolbarHeaderProps {
  page: number;
  title: string;
  clickedEventId: string | number; // Changed to clickedEventId
  clickedEventName: string; // Added clickedEventName
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>; // Add setSortBy prop
  setSortOrder: React.Dispatch<React.SetStateAction<string>>; // Add setSortOrder prop
  isActive: boolean | null; // Add isActive prop
  setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>; // Add setIsActive prop
}

const NotificationToolbarHeader: React.FC<NotificationToolbarHeaderProps> = ({
  title,
  clickedEventId,
  clickedEventName,
  searchTerm,
  setSearchTerm,
  setSortBy,
  page,
  setPage,
  setSortOrder,
  setIsActive, // Add isActive and setIsActive props
}) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<null | HTMLElement>(null); // Add state for status menu
  const navigate = useNavigate();
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

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder('asc'); // Reset to default ascending order when a new sort option is selected
    handleClose();

    // Update the query with the new sorting options
  };
  // Function to handle opening the status filter menu
  const handleClickStatusFilter = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuAnchorEl(event.currentTarget);
  };
  return (
    <Toolbar className='curved-appbar toolbar-header'>
      <Typography
        variant='h6'
        style={{ flexGrow: 1, color: '#333', fontWeight: 'bold' }}
      >
        {title} -{' '}
        <span
          style={{
            fontSize: '17px',
            color: '#3f51b5',
          }}
        >
          {clickedEventName} {/* Use clickedEventName */}
        </span>
      </Typography>
      <div style={{ position: 'relative' }}>
        <Tooltip title='Search'>
          <IconButton>
            <Search />
          </IconButton>
        </Tooltip>
        <InputBase
          placeholder='Search'
          style={{
            color: '#3f51b5',
            marginLeft: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            padding: '8px',
          }}
          inputProps={{ 'aria-label': 'search' }}
          defaultValue={searchTerm}
          onChange={(e) => {
            const v = e.target.value;

            if (v.length >= 3) {
              setPage(1);
              setSearchTerm(v);
              queryClient.invalidateQueries([
                'notifications',
                page,
                searchTerm,
              ]);
            }

            if (v.length === 0) {
              setPage(1);
              setSearchTerm('');
              queryClient.invalidateQueries(['notifications', searchTerm]);
            }
          }}
        />
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <Tooltip title='Sort By'>
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
          <MenuItem onClick={() => handleSortOptionClick('notificationName')}>
            Sort by Name
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick('dateCreated')}>
            Sort by Date
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick('isActive')}>
            Sort by Active Status
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Tooltip title='Sort Order`'>
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
          <MenuItem onClick={() => handleSortOptionClick('asc')}>
            Ascending
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick('desc')}>
            Descending
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Tooltip title='Status Filter'>
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
        <Tooltip title='Add'>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            style={{
              marginRight: '5px',
              color: '#3f51b5',
            }}
            onClick={() => {
              navigate(`/add-notification/${clickedEventId}`);
            }}
          >
            <Add />
          </Button>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default NotificationToolbarHeader;
