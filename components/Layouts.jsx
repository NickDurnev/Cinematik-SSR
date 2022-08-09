import { useUser } from '@auth0/nextjs-auth0';
import ResponsiveAppBar from './AppBar';
import Footer from './Footer';

export default function Layout({ children }) {
  const authData = useUser();
  console.log(useUser());
  return (
    <>
      <ResponsiveAppBar authData={authData} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
