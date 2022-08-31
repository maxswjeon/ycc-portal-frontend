import { Heading, Text } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import CenterPage from "components/global/CenterPage";
import Page from "components/global/Page";
import Section from "components/global/Section";
import useAuth from "hooks/queries/useAuth";
import useUserInfo from "hooks/queries/useUserInfo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ListMenuSecion from "sections/ListMenuSection";
import TileMenuSection from "sections/TileMenuSection";

const HomePage: NextPage = () => {
  const isAuth = useAuth();
  const { data, isLoading, isError, error } = useUserInfo();

  const router = useRouter();

  if (isAuth === null) {
    return (
      <CenterPage>
        <Heading as="h1" textAlign="center">
          로딩중입니다...
        </Heading>
      </CenterPage>
    );
  }

  if (!isAuth) {
    router.push("/login");
  }

  if (isLoading) {
    return (
      <CenterPage>
        <Heading as="h1" textAlign="center">
          로딩중입니다...
        </Heading>
      </CenterPage>
    );
  }

  if (isError || !data) {
    if (!axios.isAxiosError(error)) {
      return (
        <CenterPage>
          <Heading as="h1" textAlign="center">
            데이터를 불러오는 중 오류가 발생했습니다
          </Heading>
          <Text textAlign="center">알 수 없는 오류가 발생했습니다</Text>
        </CenterPage>
      );
    }

    const axiosError = error as AxiosError;

    return (
      <CenterPage>
        <Heading as="h1" textAlign="center">
          데이터를 불러오는 중 오류가 발생했습니다
        </Heading>
        <Text textAlign="center">{axiosError.message}</Text>
      </CenterPage>
    );
  }

  const { name } = data.data;

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
