import { Section, LogoContainer } from '../styles/Companies.styled';
import Image from 'next/image';

const Companies = () => (
  <Section>
    <h3>Movies by the biggest names in the industry</h3>
    <LogoContainer>
      <Image
        src="/Universal_Pictures_logo.svg"
        alt="Logo"
        width={256}
        height={256}
      />
      <Image src="/21 Century Fox.svg" alt="Logo" width={256} height={256} />
      <Image src="/Disney_wordmark.svg" alt="Logo" width={256} height={256} />
      <Image
        src="/Paramount_Pictures_Corporation_logo.svg"
        alt="Logo"
        width={256}
        height={256}
      />
      <Image
        src="/Marvel_Studios_2016_logo.svg"
        alt="Logo"
        width={256}
        height={256}
      />
    </LogoContainer>
  </Section>
);

export default Companies;
