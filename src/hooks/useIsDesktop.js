const { useMediaQuery } = require("@chakra-ui/react");

const useIsDesktop = () => {
  const [isDesktop] = useMediaQuery("(min-width: 62em)", {
    ssr: true,
    fallback: false,
  });

  return isDesktop;
};

export default useIsDesktop;
