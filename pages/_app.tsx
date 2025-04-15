import type { AppProps } from "next/app";
import { BaukastenProvider } from "@hygraph/baukasten";

import "@fontsource/inter/variable-full.css";
import { Wrapper } from "@hygraph/app-sdk-react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <BaukastenProvider>
            <Wrapper>
                <Component {...pageProps} />
            </Wrapper>
        </BaukastenProvider>
    );
}
