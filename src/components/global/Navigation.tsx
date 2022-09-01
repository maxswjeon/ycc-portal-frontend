import { Flex, Spacer } from "@chakra-ui/react";
import { faRightFromBracket, faUser } from "@fortawesome/pro-solid-svg-icons";
import Logo from "assets/Logo.png";
import axios from "axios";
import Image from "components/global/Image";
import { useRouter } from "next/router";
import Icon from "./Icon";

const Navigation = () => {
  const router = useRouter();

  const logout = async () => {
    await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/session", {
      withCredentials: true,
    });

    router.push("/login");
  };

  return (
    <Flex
      as="nav"
      width={["100%", "100%", "48em"]}
      m="auto"
      h="64px"
      borderBottom="1.5px solid #EEE"
      justifyContent="space-between"
      alignItems="center"
      gap="16px"
      px="32px"
    >
      <Image
        src={Logo}
        w="auto"
        h="auto"
        width="90px"
        height="40px"
        alt="Yonsei Computer Club Logo"
        objectFit="contain"
        cursor="pointer"
        onClick={() => router.push("/")}
      />
      <Spacer />
      <Icon cursor="pointer" icon={faUser} onClick={() => router.push("/me")} />
      <Icon cursor="pointer" icon={faRightFromBracket} onClick={logout} />
    </Flex>
  );
};

export default Navigation;
