import { NextPage } from "next";
import { Html, Head, NextScript, Main } from "next/document";

const _document: NextPage = () => {
  return (
    <Html data-theme="light">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>YourFeeling</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;