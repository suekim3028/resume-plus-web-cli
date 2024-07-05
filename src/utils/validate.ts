import { userApis } from "@apis";
import { InputValidation } from "@components";
import { validateUtils } from "@web-core";

export const validateEmail = async (
  email: string
): Promise<InputValidation> => {
  if (validateUtils.testEmail(email)) {
    return {
      isError: true,
      errorText: "이메일 양식이 올바르지 않아요",
    };
  }
  const hasDup = await userApis.checkDuplicatedEmail(email);
  if (hasDup) {
    return { isError: true, errorText: "이미 가입된 이메일입니다" };
  }

  return { isError: false };
};
