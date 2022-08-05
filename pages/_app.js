import "../styles/scss/style.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Waiwai Translator| O seu tradutor de linguas maternas</title>
        <meta
          name="description"
          content="Waiwai Translator| O seu tradutor de linguas maternas"
        />
        <link rel="icon" href="/ufopa.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
