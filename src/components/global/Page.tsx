import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Navigation from "./Navigation";

const Page = ({ children }: { children?: React.ReactNode }) => (
  <>
    <Head>
      <title>YCC - 연세대학교 중앙 컴퓨터 동아리</title>
    </Head>
    <Navigation />
    <Box
      width={["100%", "100%", "48rem"]}
      m="auto"
      minH="calc(100% - 128px)"
      p="32px"
    >
      {children}
    </Box>
    <Flex
      h="64px"
      bgColor="#F5F5F5"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        width={["100%", "100%", "48rem"]}
        px="32px"
        opacity="0.6"
        fontSize="xs"
      >
        Copyright (c) 2022 by Yonsei Computer Club All rights reserved
      </Text>
    </Flex>
  </>
);

export default Page;
