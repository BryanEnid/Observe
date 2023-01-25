import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { PortalProvider } from "./Portal";
import { AuthProvider } from "./Providers/AuthProvider";

// React Query config: Create a client
const queryClient = new QueryClient();

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export const GlobalProvider = ({ children }) => {
  const theme = extendTheme({
    config: { strictMode: "warn" },
    components: {
      Box: {
        variants: {
          elevated: () => ({
            shadowColor: "#999",
            shadowOpacity: 0.25,
            shadowRadius: 18.46,
            elevation: 22,
            shadowOffset: {
              width: 0,
              height: 16,
            },
          }),
        },
      },
      Text: {
        variants: {
          caption: () => ({
            opacity: 0.5,
            color: "red",
          }),
        },
      },
    },
  });

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
