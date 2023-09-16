import { styled } from "@mui/system";
import Card from "@mui/material/Card";

export const TileCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: `0 4px 6px rgba(88, 81, 80, 0.8)`, // Shadow color
  borderRadius: theme.spacing(2), // Rounded corners
}));

export const TileHeading = styled("h4")({
  color: "black",
});

export const TileDescription = styled("p")({
  color: "#585150",
});

export const TileContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(0), // Add padding for spacing
}));

export const ButtonGroupContainer = styled("div")(({ theme }) => ({
  display: "flex", // Added display flex to align items horizontally
  alignItems: "center", // Center items horizontally
  padding: theme.spacing(1), // Add padding for spacing
}));
export const LeftContainer = styled("div")(({ theme }) => ({
  flex: 1, // Expand to fill available space
  padding: theme.spacing(1),
}));
