import Link from 'next/link';
import PropTypes from 'prop-types';
import { StyledLink } from './Link.styled';

const NavLink = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      <StyledLink>{name}</StyledLink>
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavLink;
