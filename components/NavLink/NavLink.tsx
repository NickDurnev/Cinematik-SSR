import Link from 'next/link';
import { StyledLink } from './NavLink.styled';

interface IProps {
  href: string;
  name: string;
  key?: string;
  onClick?: () => void;
  sx?: object;
}

const NavLink = ({ href, name }: IProps) => {
  return (
    <Link href={href} passHref>
      <StyledLink>{name}</StyledLink>
    </Link>
  );
};

export default NavLink;
