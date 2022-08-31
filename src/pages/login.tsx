import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import Logo from "assets/Logo.png";
import CenterPage from "components/global/CenterPage";
import Image from "components/global/Image";
import useAuth from "hooks/queries/useAuth";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const isAuth = useAuth();

  const router = useRouter();

  const login = async () => {
    router.push(process.env.NEXT_PUBLIC_BACKEND_URL + "/login/start");
  };

  if (isAuth === null) {
    return (
      <CenterPage>
        <Heading as="h1" textAlign="center">
          로딩중입니다...
        </Heading>
      </CenterPage>
    );
  }

  if (isAuth) {
    router.push("/");
  }

  return (
    <CenterPage shadow>
      <Image src={Logo} alt="Yonsei Computer Club Logo" />
      <Heading as="h1" size="md" mt="32px" textAlign="center">
        연세대학교 중앙 컴퓨터동아리 YCC
      </Heading>

      <Button w="100%" mt="3" colorScheme="blue" onClick={login}>
        로그인
      </Button>
      <Flex justifyContent="space-between" mt="3">
        <NextLink href="/external" passHref>
          <Link opacity="0.6">외부 사용자 신청</Link>
        </NextLink>
        <NextLink href="/findPassword" passHref>
          <Link opacity="0.6">비밀번호 찾기</Link>
        </NextLink>
      </Flex>
    </CenterPage>
  );
};

export default LoginPage;
