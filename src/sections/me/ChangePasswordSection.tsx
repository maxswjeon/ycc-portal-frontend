import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import Section from "components/global/Section";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const ChangePasswordSection = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onChange" });

  const submit: SubmitHandler<FormValues> = async (form) => {
    await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/user/password",
      {
        old_password: form.oldPassword,
        new_password: form.newPassword,
      },
      { withCredentials: true }
    );

    await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/session", {
      withCredentials: true,
    });

    router.push("/login");
  };

  return (
    <Section>
      <Heading as="h2" fontSize={["md", "xl"]} fontWeight="normal">
        비밀번호 변경
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl mt="3" isRequired isInvalid={!!errors.oldPassword}>
          <FormLabel htmlFor="currentPassword">현재 비밀번호</FormLabel>
          <Input
            type="password"
            id="currentPassword"
            {...register("oldPassword", {
              required: "현재 비밀번호를 입력해 주세요",
            })}
          />
          <FormErrorMessage>
            {errors.oldPassword && errors.oldPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isRequired isInvalid={!!errors.newPassword}>
          <FormLabel htmlFor="newPassword">새 비밀번호</FormLabel>
          <Input
            type="password"
            id="newPassword"
            autoComplete="new-password"
            {...register("newPassword", {
              required: "비밀번호를 입력해주세요",
              validate: (value: string) => value.length > 8,
            })}
          />
          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isRequired isInvalid={!!errors.newPasswordConfirm}>
          <FormLabel htmlFor="newPasswordConfirm">새 비밀번호 확인</FormLabel>
          <Input
            type="password"
            id="newPasswordConfirm"
            autoComplete="new-password"
            {...register("newPasswordConfirm", {
              required: "비밀번호 확인을 입력해주세요",
              validate: (value: string) =>
                value !== watch("newPassword")
                  ? "비밀번호가 일치하지 않습니다"
                  : undefined,
            })}
          />
          <FormErrorMessage>
            {errors.newPasswordConfirm && errors.newPasswordConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <Button w="100%" mt="3" isLoading={isSubmitting} type="submit">
          비밀번호 변경
        </Button>
      </form>
    </Section>
  );
};

export default ChangePasswordSection;
