import { styled } from "@mui/system";
import Card from "@mui/material/Card";

export const AppTileCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: `0 4px 6px rgba(88, 81, 80, 0.8)`, // Shadow color
  borderRadius: theme.spacing(2), // Rounded corners
}));

export const Heading = styled("h3")({
  color: "black",
});

export const Description = styled("p")({
  color: "#585150",
});
