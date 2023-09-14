import { useState } from 'react';
import { AppTileCard, Heading, Description } from './AppTileStyles';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import CardActionArea from '@mui/material/CardActionArea'; // Import CardActionArea
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';

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
}: // applicationId,
AppTileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };
  const handleCardClick = () => {
    // // Pass the applicationId to the parent component or store it as needed
    // console.log('Clicked App ID:', applicationId);
  };
  return (
    <>
      <AppTileCard>
        <CardActionArea onClick={handleCardClick}>
          <CardContent>
            <Heading>{title}</Heading>
            <Description>{description}</Description>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <ButtonGroup
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
            onToggleClick={handleToggleClick}
            isToggled={toggled}
          />
        </CardActions>
      </AppTileCard>
    </>
  );
};

export default AppTile;
