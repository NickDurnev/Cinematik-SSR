import type { Metadata } from 'next';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

type Props = {
  children: any;
};

export const metadata: Metadata = {
  title: 'CINEMATIK',
  description: 'App for searching movies',
};

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang={'en'}>
      <Head>
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
