import "../styles/scss/style.scss";
import Head from "next/head";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Waiwai Translator| O seu tradutor de linguas maternas</title>
        <meta
          name="description"
          content="Waiwai Translator| O seu tradutor de linguas maternas"
        />
        <link rel="icon" href="/ufopa.ico" />
        <Script src="/static/script.js" strategy="beforeInteractive"></Script>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
