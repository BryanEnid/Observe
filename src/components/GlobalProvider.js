import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import { PortalProvider } from "./Portal";

// React Query config: Create a client
const queryClient = new QueryClient();

// Native Base config: config
const config = { strictMode: "warn" };

export const GlobalProvider = ({ children }) => {
  const theme = extendTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <PortalProvider>
        <NativeBaseProvider config={config} theme={theme}>
          {children}
        </NativeBaseProvider>
      </PortalProvider>
    </QueryClientProvider>
  );
};
