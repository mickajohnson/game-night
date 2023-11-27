import { Box } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Box as="body" color="black" backgroundColor="#e9fcfd">
        <Main />
        <NextScript />
      </Box>
    </Html>
  );
}
