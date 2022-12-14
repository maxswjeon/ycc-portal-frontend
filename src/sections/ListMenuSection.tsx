import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import Section from "components/global/Section";
import useAdmin from "hooks/queries/useAdmin";
import NextLink from "next/link";

const ListItem = ({ title, url }: { title: string; url: string }) => {
  return (
    <NextLink href={url} passHref>
      <Link target="_blank">
        <Text
          as="li"
          width="100%"
          height="48px"
          lineHeight="48px"
          px="5"
          borderX="1px solid #DEDEDE"
          borderBottom="1px solid #DEDEDE"
        >
          {title}
        </Text>
      </Link>
    </NextLink>
  );
};

const ListMenuSecion = () => {
  const isAdmin = useAdmin();

  const AdminLists = (
    <>
      {" "}
      <Heading
        as="h2"
        width="100%"
        height="48px"
        lineHeight="48px"
        px="5"
        fontSize="xl"
        bgColor="black"
        color="white"
      >
        임원진
      </Heading>
      <Flex as="ul" flexDirection="column" listStyleType="none">
        <ListItem title="회원 관리" url="/admin/user" />
        <ListItem title="그룹 관리" url="/admin/group" />
        <ListItem title="연세 VPN" url="https://ysvpn.yonsei.ac.kr" />
      </Flex>
    </>
  );

  return (
    <Section display={["block", "block", "none"]}>
      <Heading
        as="h2"
        width="100%"
        height="48px"
        lineHeight="48px"
        px="5"
        fontSize="xl"
        bgColor="#0037ff"
        color="white"
      >
        IT 서비스
      </Heading>
      <Flex as="ul" flexDirection="column" listStyleType="none">
        <ListItem title="메일" url="https://mail.ycc.club" />
        <ListItem title="Git" url="https://git.ycc.club" />
        <ListItem title="드라이브" url="https://cloud.ycc.club" />
        <ListItem title="위키" url="https://wiki.ycc.club" />
      </Flex>

      <Heading
        as="h2"
        width="100%"
        height="48px"
        lineHeight="48px"
        px="5"
        fontSize="xl"
        bgColor="#6c29ff"
        color="white"
      >
        학술부
      </Heading>
      <Flex as="ul" flexDirection="column" listStyleType="none">
        <ListItem title="스터디" url="https://study.ycc.club" />
      </Flex>

      {!!isAdmin && AdminLists}
    </Section>
  );
};

export default ListMenuSecion;
