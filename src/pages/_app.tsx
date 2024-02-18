import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
};

export default api.withTRPC(MyApp);
