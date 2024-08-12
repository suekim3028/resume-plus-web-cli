import { SpaceProps } from "@chakra-ui/react";

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
  onErrorChange: (value: SignUpInputValue) => void;
} & SpaceProps;
