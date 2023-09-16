import { styled } from "@mui/system";

import Card from "@mui/material/Card";

export const AppTileCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: `0 4px 6px rgba(88, 81, 80, 0.8)`, // Initial shadow
  borderRadius: theme.spacing(2), // Rounded corners
  transition: "box-shadow 0.3s, transform 0.3s", // Add transitions
  cursor: "pointer",

  "&:hover": {
    boxShadow: `0 8px 12px rgba(88, 81, 80, 0.8)`, // Hover shadow
    transform: "translateY(-2px)", // Move up a bit on hover
  },
  "&.clicked": {
    boxShadow: `0 8px 12px #3f51b5`, // Shadow with color '#3f51b5'
    transform: "translateY(-4px)", // Move up a bit on hover
  },
}));

export const Heading = styled("h3")({
  color: "black",
});

export const Description = styled("p")({
  color: "#585150",
});
