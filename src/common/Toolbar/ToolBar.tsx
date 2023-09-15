import React, { useState } from 'react';
import useHandleAddApplication from './handleAddApplication';
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
} from '@mui/material';
import { Search, Sort, SortByAlpha, Add } from '@mui/icons-material';
import FormComponent from '../Form/FormComponent';
import './ToolbarStyles.css';
import { useQueryClient } from '@tanstack/react-query';

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
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleSortOptionClick = (option: string) => {
    setSortBy(option);
    setSortOrder('asc'); // Reset to default ascending order when a new sort option is selected
    handleClose();
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddApplication = useHandleAddApplication();
  const handleFormSubmit = (formData: {
    appName: string;
    appDescription: string;
  }) => {
    if (title === 'Application') {
      handleAddApplication(formData);
      setOpenDialog(false);
    }
  };
  return (
    <Toolbar className='curved-appbar toolbar-header'>
      <Typography variant='h6' style={{ flexGrow: 1, color: 'grey' }}>
        {title}
      </Typography>
      <div style={{ position: 'relative' }}>
        <IconButton>
          <Search />
        </IconButton>

        <InputBase
          placeholder='Search'
          style={{ color: '#3f51b5', marginLeft: '10px' }}
          inputProps={{ 'aria-label': 'search' }}
          defaultValue={searchTerm}
          onChange={(e) => {
            const v = e.target.value;

            if (v.length >= 3) {
              setSearchTerm(v);
              queryClient.invalidateQueries(['applications', searchTerm]);
            }

            if (v.length === 0) {
              setSearchTerm('');
            }
          }}
        />
      </div>
      <div>
        <div style={{ display: 'flex' }}>
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
          <MenuItem onClick={() => handleSortOptionClick('appName')}>
            Sort by Name
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick('dateCreated')}>
            Sort by Date
          </MenuItem>
          <MenuItem onClick={() => handleSortOptionClick('isActive')}>
            Sort by Status
          </MenuItem>
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
          <MenuItem
            onClick={() => {
              setSortOrder('asc');
              handleClose(); // Close the menu after setting the sort order
            }}
          >
            Ascending
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortOrder('desc');
              handleClose(); // Close the menu after setting the sort order
            }}
          >
            Descending
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          size='small'
          style={{
            marginRight: '5px',
            backgroundColor: 'white',
            color: '#3f51b5',
          }}
          onClick={handleAddClick}
        >
          <Add />
        </Button>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <FormComponent
            title='Add Application'
            onCancel={handleDialogClose}
            onSubmit={handleFormSubmit}
          />
        </Dialog>
      </div>
    </Toolbar>
  );
};

export default ToolbarHeader;
