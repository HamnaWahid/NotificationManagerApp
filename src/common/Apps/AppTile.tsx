import { useState } from "react";
import { AppTileCard, Heading, Description } from "./AppTileStyles";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import CardActionArea from "@mui/material/CardActionArea"; // Import CardActionArea
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";

interface AppTileProps {
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  isToggled: boolean;
  applicationId: string | number;
  ///check
  onSelected: (applicationId: string | number) => void; // Add a new prop for handling the click event
  isClicked: boolean; // New prop for clicked state
}

const AppTile = ({
  title,
  description,
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
  applicationId,
  onSelected,
  isClicked, // Ensure the correct prop name
}: AppTileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };
  const handleCardClick = () => {
    onSelected(applicationId); // Call the onClick prop to pass the applicationId to the parent
  };
  return (
    <>
      <AppTileCard className={isClicked ? "clicked" : ""}>
        <CardActionArea onClick={handleCardClick}>
          <CardContent>
            <Heading>{title}</Heading>
            <Description>{description}</Description>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center" }}>
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
