import { EventLogger } from "@components";
import { Button, Flex, Text } from "@uis";

const RecordedStatus = ({
  url,
  goBack,
  goNext,
}: {
  url: string;
  goBack: () => void;
  goNext: () => void;
}) => {
  return (
    <Flex alignItems={"center"} h={580} w="100%" justifyContent={"center"}>
      <Flex
        flexGrow={0}
        alignSelf={"center"}
        justifyContent={"center"}
        width={384}
        height={384}
        borderRadius={28}
        bgColor={"Static/Black"}
      >
        <video
          src={url}
          autoPlay
          disableRemotePlayback
          disablePictureInPicture
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "contain",
            transform: "rotateY(180deg)",
            borderRadius: 28,
          }}
          controls={false}
          loop
          playsInline
        />
      </Flex>
      <Flex direction={"column"} alignItems={"center"} ml={90}>
        <Text type="Title3" fontWeight={"500"} color="Static/Black">
          면접 환경 체크가 완료되었어요!
        </Text>
        <Text type="Headline2" fontWeight={"400"} color="Label/Strong" my={64}>
          {`영상이 정상 녹화되었는지 확인해주세요.\n문제가 없다면 면접장으로 입장해주세요!`}
        </Text>
        <Flex gap={16}>
          <Button
            size={"Large"}
            title="다시하기"
            type="Outlined_Primary"
            onClick={() => {
              goBack();
              EventLogger.log("environment_check_button", "다시하기");
            }}
          />
          <Button
            size={"Large"}
            title="입장하기"
            type="Solid_Primary"
            onClick={() => {
              goNext();
              EventLogger.log("environment_check_button", "입장하기");
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RecordedStatus;
