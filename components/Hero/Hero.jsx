import { useEffect, useState } from 'react';
import { Container, Title } from './Hero.styled';
import Image from 'next/image';

const Hero = () => {
  const [isSizeScreen, setIsSizeScreen] = useState(null);

  useEffect(() => {
    // You now have access to `window`
    if (window.matchMedia('(min-width: 375px)').matches) {
      setIsSizeScreen('phone');
    }
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsSizeScreen('tablet');
    }
    if (window.matchMedia('(min-width: 1440px)').matches) {
      setIsSizeScreen('laptop');
    }
  }, []);

  return (
    <Container>
      <Title>Movie Change the world</Title>
      {isSizeScreen === 'phone' && (
        <Image src="/iPhone 11 Pro.png" alt="Phone" width={300} height={600} />
      )}
      {isSizeScreen === 'tablet' && (
        <Image src="/iPad Pro 11.png" alt="Tablet" width={600} height={900} />
      )}
      {isSizeScreen === 'laptop' && (
        <Image src="/MacBook Pro.png" alt="Laptop" width={1300} height={650} />
      )}
    </Container>
  );
};

export default Hero;
