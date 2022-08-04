import Head from "next/head";
import CustomComponents from "../src/components/custom/Custom-components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Waiwai Translator| O seu tradutor de linguas maternas</title>
        <meta
          name="description"
          content="Waiwai Translator| O seu tradutor de linguas maternas"
        />
        <link rel="icon" href="/ufopa.ico" />
      </Head>
      <CustomComponents />
    </div>
  );
}
