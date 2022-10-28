import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import ResponsiveAppBar from './AppBar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [skip, setskip] = useState(false);
  const authData = useUser();

  const addUser = async user => {
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };

  useEffect(() => {
    if (authData.user && !skip) {
      const { name, email, locale } = authData.user;
      (async function () {
        const { data } = await addUser({ name, email, locale });
        if (data) {
          setskip(true);
        }
      })();
    }
  }, [authData.user, skip]);

  return (
    <>
      <ResponsiveAppBar authData={authData} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
