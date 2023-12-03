import { Box } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Box as="body" color="black" backgroundColor="#C5E8FE">
        <Main />
        <NextScript />
      </Box>
    </Html>
  );
}
