import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/vina-sans/400.css";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Vina Sans', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
