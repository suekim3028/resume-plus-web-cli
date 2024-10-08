import { Flex } from "@uis";
import SurveySection from "./components/SurveySection";
import TitleSection from "./components/TitleSection";
import UserInfoSection from "./components/UserInfoSection";

const Profile = () => {
  return (
    <Flex pt={116} pb={304} w={"100%"} flexDir={"column"}>
      <TitleSection />
      <UserInfoSection />
      <SurveySection />
    </Flex>
  );
};

export default Profile;
