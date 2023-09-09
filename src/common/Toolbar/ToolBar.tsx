import React from 'react';
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Search, Sort, SortByAlpha } from '@material-ui/icons';
import './ToolbarStyles.css';

interface ToolbarHeaderProps {
  title: string;
}

const ToolbarHeader: React.FC<ToolbarHeaderProps> = ({ title }) => {
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [alphaSortAnchorEl, setAlphaSortAnchorEl] =
    React.useState<null | HTMLElement>(null);

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
        />
      </div>
      <div>
        <IconButton onClick={handleClickSortByAlpha}>
          <SortByAlpha />
        </IconButton>
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
    </Toolbar>
  );
};

export default ToolbarHeader;
