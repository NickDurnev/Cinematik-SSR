import { Section, LogoContainer } from './Companies.styled';
import Image from 'next/image';

const Companies = () => {
  return (
    <Section>
      <h3>Movies by the biggest names in the industry</h3>
      <LogoContainer>
        <div>
          <Image
            src="/Paramount_Pictures_Corporation_logo.svg"
            alt="Logo"
            width={150}
            height={90}
          />
        </div>
        <div>
          <Image
            src="/21 Century Fox.svg"
            alt="Logo"
            width={140}
            height={115}
          />
        </div>
        <div>
          <Image
            src="/Universal_Pictures_logo.svg"
            alt="Logo"
            width={150}
            height={110}
          />
        </div>
        <div>
          <Image
            src="/Disney_wordmark.svg"
            alt="Logo"
            width={150}
            height={80}
          />
        </div>
        <div>
          <Image
            src="/Marvel_Studios_2016_logo.svg"
            alt="Logo"
            width={250}
            height={60}
          />
        </div>
      </LogoContainer>
    </Section>
  );
};

export default Companies;
