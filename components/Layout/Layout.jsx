import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import ResponsiveAppBar from '../AppBar';
import Footer from '../Footer';

const Layout = ({ children, setCurrentUser, currentUser = null }) => {
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

  const addUserToDB = async userData => {
    const { data } = await addUser(userData);
    setCurrentUser(data.user);
    setskip(true);
  };

  useEffect(() => {
    if (authData.user && !skip) {
      const { name, email, locale } = authData.user;
      addUserToDB({ name, email, locale });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);

  return (
    <>
      <ResponsiveAppBar authData={authData} currentUser={currentUser} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  setCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]).isRequired,
  ]),
};
