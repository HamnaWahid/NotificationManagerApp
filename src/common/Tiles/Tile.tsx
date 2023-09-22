import React, { useState } from "react";
import {
  TileCard,
  TileHeading,
  TileDescription,
  TileContent,
  ButtonGroupContainer,
  LeftContainer,
  InfoIconContainer,
} from "./TileStyles"; // Import your styled components here

import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { CardActionArea } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Import the InfoIcon
import ReactCardFlip from "react-card-flip";
import Tooltip from "@mui/material/Tooltip";
interface TileProps {
  Id: string | number;
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  onTileClick: (Id: string | number) => void;
  isToggled: boolean;
  isClicked: boolean;
  dateCreated: string; // Add dateCreated prop
  dateUpdated: string; // Add dateUpdated prop
}

const Tile = ({
  Id,
  title,
  description,
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
  onTileClick,
  isClicked,
  dateCreated, // Destructure dateCreated prop
  dateUpdated, // Destructure dateUpdated prop
}: TileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);
  const [isFlipped, setIsFlipped] = useState<boolean>(false); // Add isFlipped state

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };

  const handleTileClick = () => {
    onTileClick(Id);
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped); // Toggle the isFlipped state
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front side */}
      <TileCard className={isClicked ? "clicked" : ""}>
        <div style={{ display: "flex" }}>
          <LeftContainer>
            <Tooltip title="Click here to edit">
              <CardActionArea onClick={handleTileClick}>
                <TileContent>
                  <div>
                    <TileHeading>{title}</TileHeading>
                    <TileDescription>
                      {" "}
                      {description.length > 40
                        ? description.slice(0, 40) + "..."
                        : description}
                    </TileDescription>
                  </div>
                </TileContent>
              </CardActionArea>
            </Tooltip>
          </LeftContainer>
          <ButtonGroupContainer>
            <ButtonGroup
              onUpdateClick={onUpdateClick}
              onDeleteClick={onDeleteClick}
              onToggleClick={handleToggleClick}
              isToggled={toggled}
            />
            <InfoIconContainer onClick={handleFlipCard}>
              <InfoIcon />
            </InfoIconContainer>
          </ButtonGroupContainer>
        </div>
      </TileCard>

      {/* Back side */}
      <TileCard className={isClicked ? "clicked" : ""}>
        <div style={{ display: "flex" }}>
          <LeftContainer>
            <CardActionArea onClick={handleTileClick}>
              <TileContent>
                <div>
                  <TileDescription>
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Description:
                    </span>{" "}
                    {description}
                    <br />
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Date Created:
                    </span>{" "}
                    {dateCreated}
                    <br />
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Date Updated:
                    </span>{" "}
                    {dateUpdated}
                  </TileDescription>
                </div>
              </TileContent>
            </CardActionArea>
          </LeftContainer>
          <ButtonGroupContainer>
            <InfoIconContainer onClick={handleFlipCard}>
              <InfoIcon />
            </InfoIconContainer>
          </ButtonGroupContainer>
        </div>
      </TileCard>
    </ReactCardFlip>
  );
};

export default Tile;
