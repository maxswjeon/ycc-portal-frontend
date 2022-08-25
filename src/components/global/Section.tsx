import { chakra } from "@chakra-ui/react";

const Section = chakra("section", {
  baseStyle: {
    w: "100%",
    mt: "32px",
    px: "16px",
    _first: {
      mt: "16px",
    },
  },
});

export default Section;
