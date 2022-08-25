import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";

const CenterPage = ({
  children,
  shadow,
}: {
  children?: React.ReactNode;
  shadow?: boolean;
}) => (
  <>
    <Head>
      <title>YCC - 연세대학교 중앙 컴퓨터 동아리</title>
    </Head>
    <Flex
      w="100%"
      maxW="30em"
      h="100%"
      m="auto"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        w="100%"
        p={["24px", "24px", "56px"]}
        rounded={shadow ? ["0", "16px"] : undefined}
        shadow={shadow ? ["none", "dark-lg"] : undefined}
      >
        {children}
      </Box>
    </Flex>
  </>
);

export default CenterPage;
