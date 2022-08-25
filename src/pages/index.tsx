import { Heading, Text } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import CenterPage from "components/global/CenterPage";
import Page from "components/global/Page";
import Section from "components/global/Section";
import useAuthState from "hooks/queries/useAuthState";
import useUserInfo from "hooks/queries/useUserInfo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ListMenuSecion from "sections/ListMenuSection";
import TileMenuSection from "sections/TileMenuSection";

const HomePage: NextPage = () => {
  const {
    data: sessionData,
    isLoading: sessionIsLoading,
    isError: sessionIsError,
    error: sessionError,
  } = useAuthState();

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useUserInfo();

  const router = useRouter();

  if (sessionIsLoading || userIsLoading) {
    return (
      <CenterPage>
        <Heading as="h1" fontSize="xl" textAlign="center">
          Loading...
        </Heading>
      </CenterPage>
    );
  }

  if (sessionIsError) {
    return (
      <CenterPage>
        <Heading as="h1" fontSize="xl" textAlign="center">
          Error occured while checking session
        </Heading>
        <Text fontSize="xs" textAlign="center">
          {axios.isAxiosError(sessionError)
            ? (sessionError as AxiosError).message
            : "Unknown error occured"}
        </Text>
      </CenterPage>
    );
  }

  if (!sessionData) {
    return (
      <CenterPage>
        <Heading as="h1" fontSize="xl" textAlign="center">
          Unknown error occured while checking session
        </Heading>
        <Text size="xs" textAlign="center">
          Query state is success, but there is no data in response
        </Text>
      </CenterPage>
    );
  }

  if (!sessionData.status) {
    router.push("/login");
    return null;
  }

  if (userIsError) {
    return (
      <CenterPage>
        <Heading as="h1" fontSize="xl" textAlign="center">
          Error occured while getting user info
        </Heading>
        <Text fontSize="xs" textAlign="center">
          {axios.isAxiosError(userError)
            ? (userError as AxiosError).message
            : "Unknown error occured"}
        </Text>
      </CenterPage>
    );
  }

  if (!userData) {
    return (
      <CenterPage>
        <Heading as="h1" fontSize="xl" textAlign="center">
          Unknown error occured while getting user info
        </Heading>
        <Text size="xs" textAlign="center">
          Query state is success, but there is no data in response
        </Text>
      </CenterPage>
    );
  }

  const { name } = userData;

  return (
    <Page>
      <Section>
        <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
          안녕하세요, {name}님!
        </Heading>
      </Section>
      <TileMenuSection />
      <ListMenuSecion />
    </Page>
  );
};

export default HomePage;
