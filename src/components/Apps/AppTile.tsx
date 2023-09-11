import { useState } from 'react';
import { AppTileCard, Heading, Description } from './AppTileStyles';
import ButtonGroup from '../../common/ButtonGroup/ButtonGroup';
import CardContent from '@mui/material/CardContent';

interface AppTileProps {
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  isToggled: boolean;
}

const AppTile = ({
  title,
  description,
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
}: AppTileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick(); // Call the parent's onToggleClick function
  };

  return (
    <AppTileCard>
      <CardContent>
        <Heading>{title}</Heading>
        <Description>{description}</Description>
        <ButtonGroup
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
          onToggleClick={handleToggleClick} // Use the local handleToggleClick function
          isToggled={toggled} // Use the local toggled state
        />
      </CardContent>
    </AppTileCard>
  );
};

export default AppTile;
