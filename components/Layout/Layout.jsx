import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import ResponsiveAppBar from '../AppBar';
import Footer from '../Footer';
import { Container, Wrap } from './Layout.styled';

const Layout = ({ children, setCurrentUser, currentUser = null }) => {
  const [skip, setskip] = useState(false);
  const authData = useUser();

  const addUser = async user => {
    try {
      const response = await fetch('api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  const addUserToDB = async userData => {
    const { data } = await addUser(userData);
    setCurrentUser(data.user);
    setskip(true);
  };

  useEffect(() => {
    if (authData.user && !skip) {
      const { name, email, locale, picture } = authData.user;
      addUserToDB({ name, email, locale, picture });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);

  return (
    <Container>
      <ResponsiveAppBar authData={authData} currentUser={currentUser} />
      <Wrap>
        <main>{children}</main>
        <Footer />
      </Wrap>
    </Container>
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
