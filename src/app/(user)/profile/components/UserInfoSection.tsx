"use client";

import { queryOptions } from "@queries";
import { useQuery } from "@tanstack/react-query";
import Row from "./Row";

const UserInfoSection = () => {
  const { data } = useQuery(queryOptions.userQueryOptions);
  if (!data) return <></>;
  const { name, email, defaultResume, remainInterview } = data.user;

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
