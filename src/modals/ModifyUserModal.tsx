import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_USER_LIST } from "constants/query";
import useAdmin from "hooks/queries/useAdmin";
import useAdminUserInfo from "hooks/queries/useAdminUserInfo";
import useAuth from "hooks/queries/useAuth";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  DN: string;
  Uid: string;
  Sn: string;
  Gn: string;
  Mail: string;
  UidNumber: string;
  StudentGender: string;
  StudentBirthday: string;
  StudentColleage: string;
  StudentMajor: string[];
  TelephoneNumber: string;
  StudentState: string;
};

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dn: string;
};

const ModifyUserModal = ({ isOpen, onClose, dn }: AddUserModalProps) => {
  const { data } = useAdminUserInfo(dn);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [major, setMajor] = useState<string>("");
  const [majors, setMajors] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const close = () => {
    reset();
    setMajor("");
    setMajors([]);
    onClose();
  };

  useEffect(() => {
    queryClient.invalidateQueries(["adminUserInfo", dn]);
  }, [dn, queryClient]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const birthday = data.user.StudentBirthday;

    setMajors(data.user.StudentMajor.split(","));
    reset({
      DN: data.user.Sn + data.user.Gn,
      Uid: data.user.Uid,
      Sn: data.user.Sn,
      Gn: data.user.Gn,
      Mail: data.user.Mail,
      UidNumber: data.user.UidNumber.toString(),
      StudentGender: data.user.StudentGender,
      StudentBirthday: `${birthday.slice(0, 4)}-${birthday.slice(
        4,
        6
      )}-${birthday.slice(6, 8)}`,
      StudentColleage: data.user.StudentColleage,
      StudentMajor: data.user.StudentMajor.split(","),
      TelephoneNumber: data.user.TelephoneNumber,
      StudentState: data.user.StudentEnrolled
        ? "??????"
        : data.user.StudentGraduated
        ? "??????"
        : "??????",
    });
  }, [data, reset, isOpen]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.patch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/user/" + dn,
        {
          uid: data.Uid,
          sn: data.Sn,
          gn: data.Gn,
          mail: data.Mail,
          uidNumber: data.UidNumber,
          studentGender: data.StudentGender,
          studentBirthday:
            data.StudentBirthday.replaceAll("-", "") + "000000+0900",
          studentColleage: data.StudentColleage,
          studentMajor: data.StudentMajor.join(","),
          telephoneNumber: data.TelephoneNumber,
          studentEnrolled: data.StudentState === "??????",
          studentGraduated: data.StudentState === "??????",
        },
        { withCredentials: true }
      );
      queryClient.invalidateQueries([QUERY_USER_LIST]);
      reset();
      setMajor("");
      setMajors([]);
      onClose();
    } catch (e) {
      alert("?????? ????????? ?????????????????????");
    }
  };

  const isAdmin = useAdmin();
  const isAuth = useAuth();

  if (!isAuth || !isAdmin) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>?????? ??????</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="3" isInvalid={!!errors.DN}>
              <FormLabel htmlFor="DN">?????? ??????</FormLabel>
              <Input
                {...register("DN", { required: true })}
                id="DN"
                onBlur={() => {
                  if (watch("DN").trim().length === 3) {
                    setValue("Sn", watch("DN").trim()[0]);
                    setValue("Gn", watch("DN").trim().slice(1));
                  }
                }}
              />
              <FormErrorMessage>
                {errors.DN && errors.DN.message}
              </FormErrorMessage>
            </FormControl>
            <Flex gap="3">
              <FormControl mt="3" isInvalid={!!errors.Sn}>
                <FormLabel htmlFor="Sn">???</FormLabel>
                <Input {...register("Sn", { required: true })} id="Sn" />
                <FormErrorMessage>
                  {errors.Sn && errors.Sn.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt="3" isInvalid={!!errors.Gn}>
                <FormLabel htmlFor="Gn">??????</FormLabel>
                <Input {...register("Gn", { required: true })} id="Gn" />
                <FormErrorMessage>
                  {errors.Gn && errors.Gn.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl mt="3" isInvalid={!!errors.Uid}>
              <FormLabel htmlFor="Uid">?????????</FormLabel>
              <Input {...register("Uid", { required: true })} id="Uid" />
              <FormErrorMessage>
                {errors.Uid && errors.Uid.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.Mail}>
              <FormLabel htmlFor="Mail">?????????</FormLabel>
              <Input {...register("Mail", { required: true })} id="Mail" />
              <FormErrorMessage>
                {errors.Mail && errors.Mail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.UidNumber}>
              <FormLabel htmlFor="UidNumber">??????</FormLabel>
              <Input
                {...register("UidNumber", { required: true })}
                id="UidNumber"
              />
              <FormErrorMessage>
                {errors.UidNumber && errors.UidNumber.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.StudentColleage}>
              <FormLabel htmlFor="StudentColleage">?????????</FormLabel>
              <Select
                {...register("StudentColleage", { required: true })}
                id="StudentColleage"
              >
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="?????????????????????">?????????????????????</option>
                <option value="????????????????????????">????????????????????????</option>
                <option value="????????????">????????????</option>
                <option value="??????????????????">??????????????????</option>
                <option value="????????????">????????????</option>
                <option value="??????????????????">??????????????????</option>
                <option value="??????????????????">??????????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????????????????">????????????????????????</option>
                <option value="?????????????????????">?????????????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
              </Select>
              <FormErrorMessage>
                {errors.StudentColleage && errors.StudentColleage.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.StudentMajor}>
              <FormLabel htmlFor="StudentMajor">??????</FormLabel>
              <Controller
                control={control}
                name="StudentMajor"
                rules={{
                  required: true,
                  validate: (value) => value.length > 0,
                }}
                render={({ field: { onChange } }) => (
                  <>
                    <Flex gap="3">
                      <Input
                        id="StudentMajor"
                        value={major}
                        onChange={(e) => setMajor(e.currentTarget.value)}
                      />
                      <Button
                        onClick={() => {
                          if (majors.includes(major.trim())) {
                            return;
                          }
                          setMajors([...majors, major.trim()]);
                          setMajor("");
                          onChange(majors);
                        }}
                      >
                        ??????
                      </Button>
                    </Flex>
                    <Box>
                      {majors.map((major, index) => (
                        <Text lineHeight="24px" fontSize="md" p="6" key={index}>
                          {major}
                        </Text>
                      ))}
                    </Box>
                  </>
                )}
              />
              <FormErrorMessage>
                {errors.StudentMajor && errors.StudentMajor.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.StudentGender}>
              <FormLabel htmlFor="StudentGender">??????</FormLabel>
              <Select {...register("StudentGender", { required: true })}>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
              </Select>
              <FormErrorMessage>
                {errors.StudentGender && errors.StudentGender.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.StudentBirthday}>
              <FormLabel htmlFor="StudentBirthday">????????????</FormLabel>
              <Input
                type="date"
                {...register("StudentBirthday", { required: true })}
                id="StudentBirthday"
              />
              <FormErrorMessage>
                {errors.StudentBirthday && errors.StudentBirthday.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.TelephoneNumber}>
              <FormLabel htmlFor="TelephoneNumber">????????????</FormLabel>
              <Input
                type="tel"
                {...register("TelephoneNumber", { required: true })}
                id="TelephoneNumber"
              />
              <FormErrorMessage>
                {errors.TelephoneNumber && errors.TelephoneNumber.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.StudentState}>
              <FormLabel htmlFor="StudentState">?????? ??????</FormLabel>
              <Select {...register("StudentState", { required: true })}>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
              </Select>
              <FormErrorMessage>
                {errors.StudentState && errors.StudentState.message}
              </FormErrorMessage>
            </FormControl>
            <Flex gap="3" my="6">
              <Button
                w="100%"
                colorScheme="red"
                onClick={() => {
                  axios.delete(
                    process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/user/" + dn,
                    { withCredentials: true }
                  );
                  close();
                }}
              >
                ?????? ????????????
              </Button>
              <Button w="100%" type="submit" isLoading={isSubmitting}>
                ?????? ????????????
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModifyUserModal;
