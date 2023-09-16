import { useState, useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
//#Services
import { addUser } from '../../services/APIService';
import { IUser } from '../../services/interfaces';
//#Components
import ResponsiveAppBar from '../AppBar';
import Footer from '../Footer';
//#Styles
import { Container, Wrap } from './Layout.styled';

interface IProps {
  children: ReactNode | ReactNode[];
  setCurrentUser: (user: IUser) => void;
  currentUser: IUser | null;
}

const Layout = ({ children, setCurrentUser, currentUser = null }: IProps) => {
  const [skip, setskip] = useState(false);
  const authData = useUser();

  const addUserToDB = async (userData: IUser) => {
    const { data } = await addUser(userData);
    setCurrentUser(data.user);
    setskip(true);
  };

  useEffect(() => {
    if (authData.user && !skip) {
      const { name, email, locale, picture } = authData.user as IUser;
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
