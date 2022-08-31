import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  faCircleExclamation,
  faInfoCircle,
  faTriangleExclamation,
} from "@fortawesome/pro-solid-svg-icons";
import axios, { AxiosError } from "axios";
import FileUpload from "components/global/FileUpload";
import Icon from "components/global/Icon";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  file: string;
};

type AddUserFileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Message = {
  type: "INFO" | "ERROR" | "WARN";
  message: string;
};

const AddUserFileModal = ({ isOpen, onClose }: AddUserFileModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const [messages, setMessages] = useState<Message[]>([]);

  const close = () => {
    setMessages([]);
    onClose();
  };

  const submit: SubmitHandler<FormValues> = async (form) => {
    const data = new FormData();
    data.append("file", form.file);

    try {
      const { data: result } = await axios.post<{
        result: boolean;
        logs: Message[];
      }>(process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/users/file", data, {
        withCredentials: true,
      });

      setMessages(result.logs);
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        setMessages([
          {
            type: "ERROR",
            message: "Unknown error",
          },
        ]);
        return;
      }

      const _error = error as AxiosError<{ result: boolean; logs: Message[] }>;

      if (!_error.response) {
        setMessages([
          {
            type: "ERROR",
            message: "Unknown error",
          },
        ]);
        return;
      }

      setMessages(_error.response.data.logs);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(submit)}>
            <FileUpload
              name="file"
              acceptedFileTypes="text/csv"
              isRequired={true}
              placeholder="회원 목록 파일"
              control={control}
            >
              회원 목록 파일
            </FileUpload>
            <Box>
              {messages.map((message, index) => (
                <Flex key={index} alignItems="center" py="3">
                  <Icon
                    icon={
                      message.type === "INFO"
                        ? faInfoCircle
                        : message.type === "WARN"
                        ? faTriangleExclamation
                        : faCircleExclamation
                    }
                    color={
                      message.type === "INFO"
                        ? "blue.500"
                        : message.type === "WARN"
                        ? "yellow.500"
                        : "red.500"
                    }
                    mx="3"
                  />
                  <Text>{message.message}</Text>
                </Flex>
              ))}
            </Box>
            <Button w="100%" type="submit" my="3" isLoading={isSubmitting}>
              등록
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddUserFileModal;
