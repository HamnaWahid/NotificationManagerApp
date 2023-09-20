import React, { useState } from "react";
import {
  AppTileCard,
  Heading,
  Description,
  InfoIconContainer,
  FlipHeading,
} from "./AppTileStyles";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ReactCardFlip from "react-card-flip";

interface AppTileProps {
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  isToggled: boolean;
  applicationId: string | number;
  onSelected: (applicationId: string | number) => void;
  isClicked: boolean;
  dateCreated: string; // Add dateCreated prop
  dateUpdated: string; // Add dateUpdated prop
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
  isClicked,
  dateCreated, // Destructure dateCreated prop
  dateUpdated, // Destructure dateUpdated prop
}: AppTileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };
  const handleCardClick = () => {
    onSelected(applicationId);
  };
  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <AppTileCard className={isClicked ? "clicked" : ""}>
          <CardActionArea>
            <div onClick={handleCardClick}>
              <CardContent>
                <Heading>{title}</Heading>
                <Description>{description}</Description>
              </CardContent>
            </div>
            <InfoIconContainer onClick={handleFlipClick}>
              <InfoIcon />
            </InfoIconContainer>
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
        <AppTileCard className={isClicked ? "clicked" : ""}>
          <CardActionArea>
            <div onClick={handleCardClick}>
              <CardContent>
                <FlipHeading>Description</FlipHeading>
                <Description>{description}</Description>
                <div>Date Created: {dateCreated}</div>
                <div>Date Updated: {dateUpdated}</div>
              </CardContent>
            </div>
            <InfoIconContainer onClick={handleFlipClick}>
              <InfoIcon />
            </InfoIconContainer>
          </CardActionArea>
        </AppTileCard>
      </ReactCardFlip>
    </>
  );
};

export default AppTile;
