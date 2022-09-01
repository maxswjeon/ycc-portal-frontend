import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import Section from "components/global/Section";
import { User } from "types/User";

type InfoSectionProps = {
  user: User;
};

const InfoSection = ({ user }: InfoSectionProps) => {
  const birthday = `${user.StudentBirthday.slice(
    0,
    4
  )}-${user.StudentBirthday.slice(4, 6)}-${user.StudentBirthday.slice(6, 8)}`;

  return (
    <Section>
      <Heading as="h2" fontSize={["md", "xl"]} fontWeight="normal">
        내 정보
      </Heading>
      <FormControl mt="3">
        <FormLabel htmlFor="DN">전체 이름</FormLabel>
        <Input id="DN" value={`${user.Sn}${user.Gn}`} readOnly disabled />
      </FormControl>
      <Flex gap="3">
        <FormControl mt="3">
          <FormLabel htmlFor="Sn">성</FormLabel>
          <Input id="Sn" value={user.Sn} readOnly disabled />
        </FormControl>
        <FormControl mt="3">
          <FormLabel htmlFor="Gn">이름</FormLabel>
          <Input id="Gn" value={user.Gn} readOnly disabled />
        </FormControl>
      </Flex>
      <FormControl mt="3">
        <FormLabel htmlFor="Uid">아이디</FormLabel>
        <Input id="Uid" value={user.Uid} readOnly disabled />
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="Mail">이메일</FormLabel>
        <Input id="Mail" value={user.Mail} readOnly disabled />
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="UidNumber">학번</FormLabel>
        <Input id="UidNumber" value={user.UidNumber} readOnly disabled />
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="StudentColleage">단과대</FormLabel>
        <Select
          id="StudentColleage"
          value={user.StudentColleage}
          isReadOnly
          disabled
        >
          <option value="문과대학">문과대학</option>
          <option value="상경대학">상경대학</option>
          <option value="경영대학">경영대학</option>
          <option value="이과대학">이과대학</option>
          <option value="공과대학">공과대학</option>
          <option value="생명시스템대학">생명시스템대학</option>
          <option value="인공지능융합대학">인공지능융합대학</option>
          <option value="신과대학">신과대학</option>
          <option value="사회과학대학">사회과학대학</option>
          <option value="음악대학">음악대학</option>
          <option value="생활과학대학">생활과학대학</option>
          <option value="교육과학대학">교육과학대학</option>
          <option value="학부대학">학부대학</option>
          <option value="언더우드국제대학">언더우드국제대학</option>
          <option value="글로벌인재대학">글로벌인재대학</option>
          <option value="의과대학">의과대학</option>
          <option value="치과대학">치과대학</option>
          <option value="간호대학">간호대학</option>
          <option value="약학대학">약학대학</option>
        </Select>
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="StudentMajor">전공</FormLabel>
        {user.StudentMajor.split(",").map((major, index) => (
          <Text lineHeight="24px" fontSize="md" p="6" key={index}>
            {major}
          </Text>
        ))}
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="StudentGender">성별</FormLabel>
        <Select value={user.StudentGender} isReadOnly disabled>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타</option>
        </Select>
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="StudentBirthday">생년월일</FormLabel>
        <Input
          type="date"
          id="StudentBirthday"
          value={birthday}
          readOnly
          disabled
        />
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="TelephoneNumber">전화번호</FormLabel>
        <Input
          type="tel"
          id="TelephoneNumber"
          value={user.TelephoneNumber}
          readOnly
          disabled
        />
      </FormControl>
      <FormControl mt="3">
        <FormLabel htmlFor="StudentState">재학 상태</FormLabel>
        <Select
          value={
            user.StudentEnrolled
              ? "재학"
              : user.StudentGraduated
              ? "졸업"
              : "휴학"
          }
          isReadOnly
          disabled
        >
          <option value="재학">재학</option>
          <option value="휴학">휴학</option>
          <option value="수료">수료</option>
          <option value="졸업">졸업</option>
        </Select>
      </FormControl>

      <Text mt="3">올바르지 않은 정보가 있다면 임원진께 문의 바랍니다</Text>
    </Section>
  );
};

export default InfoSection;
