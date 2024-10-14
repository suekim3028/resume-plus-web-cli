import { HydrationBoundary } from "@tanstack/react-query";

import { ReactNode } from "react";
import { getQueryOptions } from "./queries.consts";
import { MyQueryKey } from "./queries.types";
import { getQueryClient } from "./queries.utils";

const MyHydrationBoundary = ({
  children,
  queryKey,
}: {
  children: ReactNode;
  queryKey: MyQueryKey;
}) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getQueryOptions(queryKey));

  return <HydrationBoundary>{children}</HydrationBoundary>;
};

export default MyHydrationBoundary;
