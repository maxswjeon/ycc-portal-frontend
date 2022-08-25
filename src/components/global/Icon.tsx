import { chakra } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = chakra(FontAwesomeIcon, {
  shouldForwardProp: (prop) => ["icon"].includes(prop),
});

export default Icon;
