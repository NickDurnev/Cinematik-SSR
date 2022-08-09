import Link from 'next/link';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #1190cb;
  & + & {
    margin-left: 24px;
  }
`;

function NavLink({ href, name }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <RedLink>{name}</RedLink>
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavLink;
