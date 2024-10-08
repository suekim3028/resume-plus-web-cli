"use client";

import { useUserValue } from "@atoms";
import Row from "./Row";

const UserInfoSection = () => {
  const { user } = useUserValue();

  if (!user) return <></>;
  const { name, email, defaultResume, remainInterview } = user;

  return (
    <>
      <Row title={"이름"} body={name} />
      <Row title={"이메일"} body={email} />
      <Row title={"기본 이력서"} body={defaultResume} />
      <Row title={"응시 잔여 횟수"} body={`${remainInterview}회`} />
    </>
  );
};

export default UserInfoSection;
