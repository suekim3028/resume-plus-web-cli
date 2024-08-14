import { SpaceProps } from "@chakra-ui/react";
import { UserTypes } from "@types";

export type SignUpValueKey = keyof UserTypes.SignUpUser;

export type SignUpInputValue =
  | {
      isError: true;
      value: null;
    }
  | {
      isError: false;
      value: string;
    };

export type SignUpInputProps = {
  onErrorChange: (type: SignUpValueKey, value: SignUpInputValue) => void;
} & SpaceProps;
