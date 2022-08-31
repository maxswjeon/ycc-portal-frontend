import {
  Button,
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
  Textarea,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
};

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddGroupModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/groups",
        {
          name: data.name,
          description: data.description,
        },
        { withCredentials: true }
      );

      queryClient.invalidateQueries(["groups"]);
      onClose();
    } catch (e) {
      alert("그룹 추가에 실패하였습니다");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>그룹 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="3" isRequired isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">그룹 이름</FormLabel>
              <Input id="name" {...register("name", { required: true })} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isRequired isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">그룹 설명</FormLabel>
              <Textarea
                id="description"
                {...register("description", { required: true })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <Button w="100%" my="6" type="submit" isLoading={isSubmitting}>
              그룹 추가하기
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddGroupModal;
