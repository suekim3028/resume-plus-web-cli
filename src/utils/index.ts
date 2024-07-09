export const withErrorHandling = async <
  F extends (...args: any) => Promise<any>
>(
  fn: F,
  onError?: (error: { userMessage?: string; userTitle?: string }) => void
): Promise<
  | {
      data: F extends (...args: any) => Promise<infer R> ? R : never;
      isError: false;
    }
  | { data: undefined; isError: true }
> => {
  try {
    const response = await fn();
    return {
      data: response,
      isError: false,
    };
  } catch (error) {
    alert("오류가 발생하였습니다. 다시 시도해주세요.");
    return {
      data: undefined,
      isError: true,
    };
  }
};

export * as inputUtils from "./input";
