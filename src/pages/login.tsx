import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import Logo from "assets/Logo.png";
import axios, { AxiosError } from "axios";
import CenterPage from "components/global/CenterPage";
import Image from "components/global/Image";
import useAuthState from "hooks/queries/useAuthState";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginResponse } from "types/Responses";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [globalError, setGlobalError] = useState<string | undefined>(undefined);

  const {
    data: sessionData,
    isLoading: sessionIsLoading,
    isError: sessionIsError,
    error: sessionError,
  } = useAuthState();

  const router = useRouter();

  if (sessionIsLoading) {
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

  if (sessionData.status) {
    router.push("/");
    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setGlobalError(undefined);

    try {
      const { data } = await axios.post<LoginResponse>(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/session",
        formData,
        { withCredentials: true }
      );

      if (!data.result) {
        setGlobalError("알 수 없는 오류가 발생했습니다. (Error Code 2)");
        return;
      }

      router.push("/");
    } catch (_error: unknown) {
      if (!axios.isAxiosError(_error)) {
        setGlobalError("알 수 없는 오류가 발생했습니다. (Error Code: -1)");
        return;
      }

      const error = _error as AxiosError<LoginResponse>;

      if (!error.response) {
        setGlobalError(error.message);
        return;
      }

      const { data } = error.response;
      setGlobalError(data.error);
      return;
    }
  };

  return (
    <CenterPage shadow>
      <Image src={Logo} alt="Yonsei Computer Club Logo" />
      <Heading as="h1" size="lg" mt="32px">
        로그인
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt="3" isInvalid={!!errors.username}>
          <FormLabel>아이디 또는 학번</FormLabel>
          <Input
            type="text"
            placeholder="아이디 또는 학번"
            {...register("username", { required: true })}
          />
          <FormErrorMessage>
            {errors.username && "아이디를 입력해 주세요"}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={!!errors.password}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true })}
          />
          <FormErrorMessage>
            {errors.password && "비밀번호를 입력해 주세요"}
          </FormErrorMessage>
        </FormControl>
        {globalError && (
          <FormControl mt="3" isInvalid={true}>
            <FormErrorMessage mt="3">{globalError}</FormErrorMessage>
          </FormControl>
        )}
        <Button w="100%" type="submit" mt="3" isLoading={isSubmitting}>
          로그인
        </Button>
      </form>
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
