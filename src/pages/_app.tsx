import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FC } from "react";
import { DehydratedState, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ParallaxProvider } from "react-scroll-parallax";
import { YMaps } from "react-yandex-maps";

import Footer from "@/shared/footer";
import Header from "@/shared/header";
import ScrollButton from "@/shared/UI/buttons/scrollButton";
import { wrapper } from "@/store/store";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                retry: 1,
            },
        },
    });

    // @ts-ignore
    const dehydrate: DehydratedState = pageProps.dehydratedState;

    return (
        <QueryClientProvider client={client}>
            <Hydrate state={dehydrate}>
                <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YMAP_KEY }}>
                    <ParallaxProvider>
                        <main className={"relative h-full"}>
                            <ScrollButton />
                            <Component key={router.asPath} {...pageProps} />
                        </main>
                    </ParallaxProvider>
                </YMaps>
            </Hydrate>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
    );
};

export default wrapper.withRedux(MyApp);
