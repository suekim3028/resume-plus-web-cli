import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ReactNode } from "react";
import { queryOptionGenerator } from "./queries.consts";
import { MyQueryData, MyQueryKey } from "./queries.types";
import { getQueryClient } from "./queries.utils";

const MyHydrationBoundary = async <T extends MyQueryKey>({
  children,
  queryKey,
  deps,
}: MyQueryData[T]["deps"] extends undefined
  ? {
      children: ReactNode;
      queryKey: T;
      deps?: undefined;
    }
  : {
      children: ReactNode;
      queryKey: T;
      deps: MyQueryData[T]["deps"];
    }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryOptionGenerator[queryKey](deps));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MyHydrationBoundary;
