import { styled } from "@mui/system";
import Card from "@mui/material/Card";

export const TileCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: `0 4px 6px rgba(88, 81, 80, 0.8)`,
  borderRadius: theme.spacing(2),
  transition: "box-shadow 0.3s, transform 0.3s",
  cursor: "pointer",

  "&:hover": {
    boxShadow: `0 8px 12px rgba(88, 81, 80, 0.8)`,
    transform: "translateY(-2px)",
  },
  "&.clicked": {
    boxShadow: `0 8px 12px #3f51b5`,
    transform: "translateY(-4px)",
  },
}));

export const TileHeading = styled("h4")({
  color: "black",
});

export const TileDescription = styled("p")({
  color: "#585150",
});
export const FlipHeading = styled("h4")({
  color: "black",
  fontWeight: "bold",
});
export const TileContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(0), // Add padding for spacing
}));
export const InfoIconContainer = styled("div")({
  position: "absolute",
  top: 10, // Adjust this value as needed to position the icon vertically
  right: 10, // Adjust this value as needed to position the icon horizontally
});
export const ButtonGroupContainer = styled("div")(({ theme }) => ({
  display: "flex", // Added display flex to align items horizontally
  alignItems: "center", // Center items horizontally
  padding: theme.spacing(1), // Add padding for spacing
}));
export const LeftContainer = styled("div")(({ theme }) => ({
  flex: 1, // Expand to fill available space
  padding: theme.spacing(1),
}));
