import { Flex } from "@chakra-ui/react";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import {
  faBookOpenCover,
  faBooks,
  faCloud,
  faComputer,
  faEnvelope,
  faGraduationCap,
  faScrewdriverWrench,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import Section from "components/global/Section";
import Tile from "components/Tile";
import useAdmin from "hooks/queries/useAdmin";
import { useRouter } from "next/router";

const TileMenuSection = () => {
  const isAdmin = useAdmin();

  const router = useRouter();

  if (isAdmin === null) {
    return null;
  }

  return (
    <Section display={["none", "none", "block"]}>
      <Flex mt="3" gap="10px" justifyContent="start" flexWrap="wrap">
        <Tile
          icon={faComputer}
          title="IT 서비스"
          size="100px"
          color="white"
          borderColor="#0037ff"
          textColor="black"
        />
        <Tile
          icon={faEnvelope}
          title="메일"
          size="100px"
          color="#0037ff"
          textColor="#E5E5F5"
          onClick={() => router.push("https://mail.ycc.club")}
        />
        <Tile
          icon={faGitlab}
          title="Git"
          size="100px"
          color="#0037ff"
          textColor="#E5E5F5"
          onClick={() => router.push("https://git.ycc.club")}
        />
        <Tile
          icon={faCloud}
          title="드라이브"
          size="100px"
          color="#0037ff"
          textColor="#E5E5F5"
          onClick={() => router.push("https://cloud.ycc.club")}
        />
        <Tile
          icon={faBookOpenCover}
          title="위키"
          size="100px"
          color="#0037ff"
          textColor="#E5E5F5"
          onClick={() => router.push("https://wiki.ycc.club")}
        />
      </Flex>
      <Flex mt="3" gap="10px" justifyContent="start" flexWrap="wrap">
        <Tile
          icon={faGraduationCap}
          title="학술부"
          size="100px"
          color="white"
          borderColor="#6c29ff"
          textColor="black"
        />
        <Tile
          icon={faBooks}
          title="스터디"
          size="100px"
          color="#6c29ff"
          textColor="#E5E5F5"
          onClick={() => router.push("https://study.ycc.club")}
        />
      </Flex>
      <Flex
        mt="3"
        gap="10px"
        justifyContent="start"
        flexWrap="wrap"
        display={isAdmin ? "flex" : "none"}
      >
        <Tile
          icon={faScrewdriverWrench}
          title="임원진"
          size="100px"
          color="white"
          borderColor="black"
          textColor="black"
        />
        <Tile
          icon={faUsers}
          title="회원 관리"
          size="100px"
          color="black"
          textColor="white"
          onClick={() => router.push("/admin/user")}
        />
      </Flex>
    </Section>
  );
};

export default TileMenuSection;
