import { useState } from 'react';
import { AppTileCard, Heading, Description } from './AppTileStyles';
import ButtonGroup from '../../common/ButtonGroup/ButtonGroup';
import CardActionArea from '@mui/material/CardActionArea'; // Import CardActionArea
import CardContent from '@mui/material/CardContent';

interface AppTileProps {
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  isToggled: boolean;
  applicationId: string | number;
}

const AppTile = ({
  title,
  description,
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
  applicationId,
}: AppTileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };
  const handleCardClick = () => {
    // Pass the applicationId to the parent component or store it as needed
    console.log('Clicked App ID:', applicationId);
  };
  return (
    <CardActionArea onClick={handleCardClick}>
      <AppTileCard>
        <CardContent>
          <Heading>{title}</Heading>
          <Description>{description}</Description>
          <ButtonGroup
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
            onToggleClick={handleToggleClick}
            isToggled={toggled}
          />
        </CardContent>
      </AppTileCard>
    </CardActionArea>
  );
};

export default AppTile;
