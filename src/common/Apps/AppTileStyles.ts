// import { styled } from "@mui/system";

// import Card from "@mui/material/Card";

// export const AppTileCard = styled(Card)(({ theme }) => ({
//   backgroundColor: "white",
//   boxShadow: `0 4px 6px rgba(88, 81, 80, 0.8)`, // Initial shadow
//   borderRadius: theme.spacing(2), // Rounded corners
//   transition: "box-shadow 0.3s, transform 0.3s", // Add transitions
//   cursor: "pointer",

//   "&:hover": {
//     boxShadow: `0 8px 12px rgba(88, 81, 80, 0.8)`, // Hover shadow
//     transform: "translateY(-2px)", // Move up a bit on hover
//   },
//   "&.clicked": {
//     boxShadow: `0 8px 12px #3f51b5`, // Shadow with color '#3f51b5'
//     transform: "translateY(-4px)", // Move up a bit on hover
//   },
// }));

// export const Heading = styled("h3")({
//   color: "black",
// });

// export const Description = styled("p")({
//   color: "#585150",
// });

import { styled } from "@mui/system";
import Card from "@mui/material/Card";

// Define your styles using tagged template literals
const AppTileCard = styled(Card)(({ theme }) => ({
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

const Heading = styled("h3")({
  color: "black",
});
const FlipHeading = styled("h4")({
  color: "black",
  fontWeight: "bold",
});
const Description = styled("p")({
  color: "#585150",
});

// Define the styles for the flipped description
const flippedDescription = {
  display: "none",
  color: "#585150", // Add your desired color
  fontStyle: "italic", // Add your desired style
};
const InfoIconContainer = styled("div")({
  position: "absolute",
  top: 10, // Adjust this value as needed to position the icon vertically
  right: 10, // Adjust this value as needed to position the icon horizontally
});
export {
  AppTileCard,
  Heading,
  Description,
  flippedDescription,
  InfoIconContainer,
  FlipHeading,
};
