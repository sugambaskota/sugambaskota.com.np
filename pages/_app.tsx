import * as React from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { ConfigProvider } from "antd";
import { SessionProvider, useSession } from "next-auth/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "antd/dist/antd.variable.min.css";
import "styles/globals.scss";
import "styles/preflight.scss";
import "styles/main.scss";
import "styles/antd.scss";

import ThemeProvider from "context/theme/ThemeContext";
import { handleError } from "utils/handler/error";
import SuspenseLoading from "components/loading/suspenseLoading/SuspenseLoading";
import Layout from "components/layout/layout/Layout";
import AdminLayout from "components/layout/adminlayout/AdminLayout";
import { ADMIN_LAYOUT } from "constants/layout";

NProgress.configure({
  showSpinner: false,
});

ConfigProvider.config({
  theme: {
    primaryColor: "#059669",
  },
});

function getLayout(Component: any, pageProps: any) {
  switch (Component?.config?.layout) {
    case ADMIN_LAYOUT:
      return (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      );
    default:
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
  }
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount: number, error: any) => {
              if (
                error?.response?.status === 401 ||
                error?.response?.status === 403 ||
                error?.response?.status === 404
              ) {
                return false;
              }
              return failureCount < 1;
            },
            onError: (error) => handleError(error),
          },
          mutations: {
            onError: (error) => handleError(error),
          },
        },
      })
  );

  const router = useRouter();

  React.useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            {Component?.config?.protected ? (
              <Auth config={Component?.config}>
                {getLayout(Component, pageProps)}
              </Auth>
            ) : (
              <NoAuth>{getLayout(Component, pageProps)}</NoAuth>
            )}
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth({ children, config }: any) {
  const router = useRouter();
  const session: any = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/");
    },
  });

  React.useEffect(() => {
    if (
      session?.data?.user?.role &&
      session?.data?.user?.role !== config?.role
    ) {
      router.push("/");
    }
  }, [session]);

  if (session?.status === "loading") {
    return <SuspenseLoading />;
  }

  if (session?.data?.user?.role && session?.data?.user?.role === config?.role) {
    return children;
  }

  return null;
}

function NoAuth({ children }: any) {
  return children;
}
