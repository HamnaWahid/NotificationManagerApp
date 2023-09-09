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
  return (
    <AppTileCard>
      <CardContent>
        <Heading>{title}</Heading>
        <Description>{description}</Description>
        <ButtonGroup
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
          onToggleClick={onToggleClick}
          isToggled={isToggled}
        />
      </CardContent>
    </AppTileCard>
  );
};

export default AppTile;
