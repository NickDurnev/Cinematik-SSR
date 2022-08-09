import { Container, Title } from '../styles/Hero.styled';
import Image from 'next/image';

const Hero = () => (
  <Container>
    {/* <Image src="/City Lights.jpg" alt="Night city" width={800} height={500} /> */}
    <Title>Movie Change the world</Title>
    <Image src="/MacBook Pro.png" alt="Laptop" width={800} height={500} />
  </Container>
);

export default Hero;
