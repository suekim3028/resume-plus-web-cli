"use client";

import { getQueryClient } from "@queries/queries.utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { memo, ReactNode } from "react";

const ClientProviderGroup = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default memo(ClientProviderGroup);
