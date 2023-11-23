import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/vina-sans/400.css";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      sea: "#3D5A80",
      sky: "#98C1D9",
      ice: "#E0FBFC",
      lava: "#C96480",
      land: "#B47978",
      matcha: "#C9D5B5",
      icon: "#425a7d",
    },
  },
});

export default theme;
