import { UpdateButton, DeleteButton, ToggleButton } from './ButtonStyles';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
import DeleteIcon from '@mui/icons-material/Delete';

interface ButtonGroupProps {
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  isToggled: boolean;
}

const ButtonGroup = ({
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
}: ButtonGroupProps) => {
  return (
    <div>
      <Tooltip title='Update'>
        <UpdateButton onClick={onUpdateClick}>
          <EditIcon />
        </UpdateButton>
      </Tooltip>
      <span style={{ margin: '0 8px' }}></span>
      <Tooltip title='Delete'>
        <DeleteButton onClick={onDeleteClick}>
          <DeleteIcon />
        </DeleteButton>
      </Tooltip>

      <span style={{ margin: '0 8px' }}></span>
      <Tooltip title='Deactivate'>
        <ToggleButton
          checked={isToggled}
          onChange={onToggleClick}
          name='toggle'
        />
      </Tooltip>
    </div>
  );
};

export default ButtonGroup;
