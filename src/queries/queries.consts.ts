import { authActions } from "@actions";
import { queryOptions, QueryOptions } from "@tanstack/react-query";
import { MyQueryData, MyQueryKey } from "./queries.types";

const myQueryOptions: {
  [queryKey in MyQueryKey]: Omit<
    QueryOptions<MyQueryData[queryKey]>,
    "queryKey"
  >;
} = {
  USER: {
    queryFn: async () => {
      const tokenRes = await authActions.tokenLogin();
      if (!tokenRes) return null;
      return {
        isGuest: tokenRes.isGuestUser,
        user: tokenRes.user,
      };
    },
  },
};

export const getQueryOptions = (queryKey: MyQueryKey) => {
  return queryOptions({
    ...myQueryOptions[queryKey],
    queryKey: [queryKey],
  });
};
