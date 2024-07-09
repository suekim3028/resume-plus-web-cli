import { InputValidation } from "@components";
import { validateUtils } from "@web-core";

export const validateEmail = async (
  email: string
): Promise<InputValidation> => {
  if (!validateUtils.testEmail(email)) {
    return {
      isError: true,
      errorText: "이메일 양식이 올바르지 않아요",
    };
  }
  // const hasDup = await userApis.checkDuplicatedEmail(email); // TODO: api
  const hasDup = false;
  if (hasDup) {
    return { isError: true, errorText: "이미 가입된 이메일입니다" };
  }

  return { isError: false };
};

export const validateName = async (name: string): Promise<InputValidation> => {
  const _name = name.replaceAll(" ", "");

  if (_name !== name || !validateUtils.testKoreanName(_name)) {
    return {
      errorText: "이름에는 공백과 특수문자가 포함될 수 없습니다",
      isError: true,
    };
  }

  return {
    isError: false,
  };
};
