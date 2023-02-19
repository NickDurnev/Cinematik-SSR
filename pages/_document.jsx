import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="CINEMATIK" content="App for searching movies" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
