import {
  dehydrate,
  HydrationBoundary,
  QueryOptions,
} from "@tanstack/react-query";

import { ReactNode } from "react";
import { getQueryClient } from "./queries.utils";

const MyHydrationBoundary = async <T extends unknown>({
  children,
  queryOptions,
}: {
  children: ReactNode;
  queryOptions: QueryOptions<T> & Required<Pick<QueryOptions<T>, "queryKey">>;
}) => {
  const queryClient = getQueryClient();
  console.log("===hydration", queryOptions);
  await queryClient.prefetchQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MyHydrationBoundary;
