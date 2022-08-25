import { Center, Circle, Text } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "components/global/Icon";

type TitleProps = {
  alert?: boolean;
  icon: IconProp;
  title: string;
  color: string;
  textColor: string;
  borderColor?: string;
  size: string;
  onClick?: () => void;
};

const Tile = (props: TitleProps) => {
  const { alert, icon, title, color, textColor, borderColor, size, onClick } =
    props;

  return (
    <Center
      position="relative"
      flexDirection="column"
      width={size}
      height={size}
      border={borderColor ? `1px solid ${borderColor}` : undefined}
      bgColor={color}
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
    >
      <Icon icon={icon} fontSize="1.5em" color={textColor} />
      <Text mt="2" color={textColor}>
        {title}
      </Text>
      <Circle
        position="absolute"
        top="10px"
        right="10px"
        size="10px"
        display={alert ? "block" : "none"}
      />
    </Center>
  );
};

export default Tile;
