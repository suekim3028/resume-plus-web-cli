"use client";
import { userApis } from "@apis";
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
  const { isError, data: hasDup } = await userApis.checkDuplicatedEmail(email);

  if (hasDup) {
    return { isError: true, errorText: "이미 가입된 이메일입니다" };
  }

  return { isError: false };
};

export const validateName = async (name: string): Promise<InputValidation> => {
  const nameRegex = /^[가-힣]+$/;

  if (!nameRegex.test(name)) {
    return {
      errorText: "이름에는 공백과 특수문자가 포함될 수 없습니다",
      isError: true,
    };
  }

  return {
    isError: false,
  };
};

export const validatePassword = async (
  password: string
): Promise<InputValidation> => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?()\-_={}[\]~₩<>,.])[a-zA-Z\d!@#$%^&*?()\-_={}[\]~₩<>,.]{8,16}$/;

  if (!passwordRegex.test(password)) {
    return {
      errorText:
        "8자 이상 16자 이하로 영문,숫자,특수문자를 3가지 이상 조합해주세요",
      isError: true,
    };
  }

  return {
    isError: false,
  };
};
