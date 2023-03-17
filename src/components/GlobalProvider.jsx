import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { PortalProvider } from "./Portal";
import { AuthProvider } from "./Providers/AuthProvider";
import { theme } from "./Theme";

// React Query config: Create a client
const queryClient = new QueryClient();

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

// !THEME
export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PortalProvider>
          <NativeBaseProvider config={config} theme={theme}>
            {children}
          </NativeBaseProvider>
        </PortalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};
