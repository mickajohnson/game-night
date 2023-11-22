import { Box } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Box as="body" color="black" background="brand.ice">
        <Main />
        <NextScript />
      </Box>
    </Html>
  );
}
