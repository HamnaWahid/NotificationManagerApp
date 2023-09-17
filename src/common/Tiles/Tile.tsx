import React, { useState } from "react";
import {
  TileCard,
  TileHeading,
  TileDescription,
  TileContent,
  ButtonGroupContainer,
  LeftContainer,
} from "./TileStyles"; // Import your styled components here

import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { CardActionArea } from "@mui/material";

interface TileProps {
  Id: string | number; //  to the interface
  title: string;
  description: string;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onToggleClick: () => void;
  onTileClick: (Id: string | number) => void;
  isToggled: boolean;
  isClicked: boolean; // New prop for clicked state
}

const Tile = ({
  Id,
  title,
  description,
  onUpdateClick,
  onDeleteClick,
  onToggleClick,
  isToggled,
  onTileClick, // Add a prop to handle tile click
  isClicked,
}: TileProps) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const handleToggleClick = () => {
    setToggled(!toggled);
    onToggleClick();
  };

  const handleTileClick = () => {
    // Call the onTileClick prop to pass the clicked Id
    onTileClick(Id);
  };

  return (
    <TileCard className={isClicked ? "clicked" : ""} onClick={handleTileClick}>
      <div style={{ display: "flex" }}>
        <LeftContainer>
          <CardActionArea onClick={handleTileClick}>
            <TileContent>
              <div>
                <TileHeading>{title}</TileHeading>
                <TileDescription>{description}</TileDescription>
              </div>
            </TileContent>
          </CardActionArea>
        </LeftContainer>
        <ButtonGroupContainer>
          <ButtonGroup
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
            onToggleClick={handleToggleClick}
            isToggled={toggled}
          />
        </ButtonGroupContainer>
      </div>
    </TileCard>
  );
};

export default Tile;
