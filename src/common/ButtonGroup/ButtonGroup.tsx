import { UpdateButton, DeleteButton, ToggleButton } from './ButtonStyles';
import EditIcon from '@mui/icons-material/Edit';
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
      <UpdateButton onClick={onUpdateClick}>
        <EditIcon />
      </UpdateButton>
      <span style={{ margin: '0 8px' }}></span>
      <DeleteButton onClick={onDeleteClick}>
        <DeleteIcon />
      </DeleteButton>
      <span style={{ margin: '0 8px' }}></span>
      <ToggleButton
        checked={isToggled}
        onChange={onToggleClick}
        name='toggle'
      />
    </div>
  );
};

export default ButtonGroup;
