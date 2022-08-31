import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Page from "components/global/Page";
import Section from "components/global/Section";
import useAdmin from "hooks/queries/useAdmin";
import useAuth from "hooks/queries/useAuth";
import useGroupList from "hooks/queries/useGroupList";
import useUserList from "hooks/queries/useUserList";
import AddGroupModal from "modals/AddGroupModal";
import { useState } from "react";

const AdminGroupPage = () => {
  const isAuth = useAuth();
  const isAdmin = useAdmin();

  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = useGroupList();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserList();

  const [currentGroupDN, setCurrentGroupDN] = useState<string>("");

  const {
    isOpen: isAddDialogOpen,
    onOpen: onAddDialogOpen,
    onClose: onAddDialogClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

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

  if (isUserLoading || isGroupLoading) {
    return (
      <Page>
        <Section>
          <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
            그룹 관리
          </Heading>
          <Flex justifyContent="end" gap="10px">
            <Button disabled>그룹 추가</Button>
            <Button disabled>그룹 삭제</Button>
          </Flex>
          <Heading as="h2" mt="3" fontSize={["xl", "2xl"]} textAlign="center">
            로딩중입니다...
          </Heading>
        </Section>
      </Page>
    );
  }

  if (isUserError || isGroupError || !userData || !groupData) {
    return (
      <Page>
        <Section>
          <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
            그룹 관리
          </Heading>
          <Flex justifyContent="end" gap="10px">
            <Button disabled>그룹 추가</Button>
            <Button disabled>그룹 삭제</Button>
          </Flex>
          <Heading as="h2" mt="3" fontSize={["xl", "2xl"]} textAlign="center">
            그룹 목록 로딩 중 오류가 발생했습니다
          </Heading>
        </Section>
      </Page>
    );
  }

  const addToGroup = async (dn: string) => {
    if (!currentGroupDN) return;

    await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/admin/groups/" +
        currentGroupDN +
        "/users",
      { dn: dn },
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["groups"]);
  };

  const removeFromGroup = async (dn: string) => {
    if (!currentGroupDN) return;

    await axios.delete(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/admin/groups/" +
        currentGroupDN +
        "/users/" +
        dn,
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["groups"]);
  };

  const deleteGroup = async () => {
    if (!currentGroupDN) return;

    await axios.delete(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/group/" + currentGroupDN,
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["groups"]);
    setCurrentGroupDN("");
  };

  const currentGroup = groupData.groups.find((g) => g.DN === currentGroupDN);

  return (
    <Page>
      <Section>
        <Heading as="h1" fontSize={["xl", "2xl"]} fontWeight="normal">
          그룹 관리
        </Heading>
        <Flex justifyContent="end" gap="10px">
          <Button onClick={onAddDialogOpen}>그룹 추가</Button>
          <Button
            onClick={deleteGroup}
            colorScheme="red"
            disabled={currentGroupDN === ""}
          >
            그룹 삭제
          </Button>
        </Flex>
        <Select
          mt="3"
          placeholder="그룹을 선택해주세요"
          onChange={(e) =>
            setCurrentGroupDN(
              groupData.groups.find(
                (group) => group.DN === e.currentTarget.value
              )?.DN || ""
            )
          }
        >
          {groupData.groups
            .sort((a, b) => a.Cn.localeCompare(b.Cn))
            .map((group) => (
              <option key={group.DN} value={group.DN}>
                {group.Cn}
              </option>
            ))}
        </Select>
        <Text mt="3">{currentGroup && currentGroup?.Description}</Text>
        <Flex gap="3">
          <Box flex="1">
            <Text fontWeight="bold" textAlign="center" p="3">
              전체 멤버
            </Text>
            {currentGroupDN &&
              userData.data
                .filter((user) => !currentGroup?.Members.includes(user.DN))
                .sort((a, b) => a.Cn.localeCompare(b.Cn))
                .map((user) => (
                  <Flex
                    key={user.DN}
                    p="3"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                    onClick={() => addToGroup(user.DN)}
                  >
                    <Text fontWeight="bold">{user.Cn}</Text>
                    <Text style={{ fontVariantNumeric: "tabular-nums" }}>
                      {user.UidNumber}
                    </Text>
                  </Flex>
                ))}
          </Box>
          <Box flex="1">
            <Text fontWeight="bold" textAlign="center" p="3">
              그룹 멤버
            </Text>
            {currentGroupDN &&
              userData.data
                .filter((user) => currentGroup?.Members.includes(user.DN))
                .sort((a, b) => a.Cn.localeCompare(b.Cn))
                .map((user) => (
                  <Flex
                    key={user.DN}
                    p="3"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #ddd"
                    cursor="pointer"
                    onClick={() => removeFromGroup(user.DN)}
                  >
                    <Text fontWeight="bold">{user.Cn}</Text>
                    <Text style={{ fontVariantNumeric: "tabular-nums" }}>
                      {user.UidNumber}
                    </Text>
                  </Flex>
                ))}
          </Box>
        </Flex>
      </Section>
      <AddGroupModal isOpen={isAddDialogOpen} onClose={onAddDialogClose} />
    </Page>
  );
};

export default AdminGroupPage;
