import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import axios from "axios";
import Icon from "components/global/Icon";
import Page from "components/global/Page";
import Section from "components/global/Section";
import useAdmin from "hooks/queries/useAdmin";
import useAuth from "hooks/queries/useAuth";
import useUserList from "hooks/queries/useUserList";
import AddUserFileModal from "modals/AddUserFileModal";
import AddUserModal from "modals/AddUserModal";
import ModifyUserModal from "modals/ModifyUserModal";
import { NextPage } from "next";
import { useState } from "react";

const AdminUserPage: NextPage = () => {
  const isAdmin = useAdmin();
  const isAuth = useAuth();

  const { data, isLoading, isError, error } = useUserList();

  const {
    isOpen: isAddDialogOpen,
    onOpen: onAddDialogOpen,
    onClose: onAddDialogClose,
  } = useDisclosure();

  const {
    isOpen: isUserDialogOpen,
    onOpen: onUserDialogOpen,
    onClose: onUserDialogClose,
  } = useDisclosure();

  const {
    isOpen: isFileDialogOpen,
    onOpen: onFileDialogOpen,
    onClose: onFileDialogClose,
  } = useDisclosure();

  const [userDN, setUserDN] = useState<string>("");

  if (!isAuth || !isAdmin) {
    return (
      <Page>
        <Section>
          <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
            회원 관리
          </Heading>
          <Heading
            as="h2"
            mt="3"
            fontSize={["lg", "xl"]}
            fontWeight="normal"
            textAlign="center"
          >
            접근 권한이 없는 페이지에 접근하였습니다
          </Heading>
        </Section>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <Page>
        <Section>
          <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
            회원 관리
          </Heading>
          <Flex justifyContent="end" gap="10px">
            <Button disabled>회원 추가</Button>
            <Button disabled>파일에서 추가</Button>
          </Flex>
          <Heading
            as="h2"
            fontSize={["xl", "2xl"]}
            fontWeight="normal"
            textAlign="center"
          >
            로딩중입니다...
          </Heading>
        </Section>
      </Page>
    );
  }

  if (isError || !data) {
    const message = axios.isAxiosError(error)
      ? error.message
      : "알 수 없는 오류가 발생했습니다.";

    return (
      <Page>
        <Section>
          <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
            회원 관리
          </Heading>
          <Flex justifyContent="end" gap="10px">
            <Button disabled>회원 추가</Button>
            <Button disabled>파일에서 추가</Button>
          </Flex>
          <Heading
            as="h2"
            mt="3"
            fontSize={["lg", "xl"]}
            fontWeight="normal"
            textAlign="center"
          >
            회원 목록 로딩 중 오류가 발생했습니다.
          </Heading>
          <Text fontSize="xs" textAlign="center">
            {message}
          </Text>
        </Section>
      </Page>
    );
  }

  return (
    <Page>
      <Section>
        <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
          회원 관리
        </Heading>
        <Flex justifyContent="end" mt="3">
          <Menu>
            <MenuButton as={Button} rightIcon={<Icon icon={faChevronDown} />}>
              추가
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onAddDialogOpen}>직접 추가</MenuItem>
              <MenuItem onClick={onFileDialogOpen}>파일에서 추가</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Table variant="simple" mt="3">
          <Thead>
            <Tr>
              <Th textAlign="center">이름</Th>
              <Th textAlign="center">학번</Th>
              <Th textAlign="center">아이디</Th>
              <Th textAlign="center">연세메일</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((user) => (
              <Tr
                key={user.DN}
                cursor="pointer"
                onClick={() => {
                  setUserDN(user.DN);
                  onUserDialogOpen();
                }}
              >
                <Td textAlign="center">{user.Cn}</Td>
                <Td textAlign="center">{user.UidNumber}</Td>
                <Td textAlign="center">{user.Uid.toLowerCase()}</Td>
                <Td textAlign="center">{user.Mail.toLowerCase()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Section>
      <AddUserModal isOpen={isAddDialogOpen} onClose={onAddDialogClose} />
      <ModifyUserModal
        isOpen={isUserDialogOpen}
        onClose={onUserDialogClose}
        dn={userDN}
      />
      <AddUserFileModal isOpen={isFileDialogOpen} onClose={onFileDialogClose} />
    </Page>
  );
};

export default AdminUserPage;
