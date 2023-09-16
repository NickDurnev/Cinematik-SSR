import Image from 'next/image';
import AppLink from '../AppLink/AppLink';
import { IUser } from '../../services/interfaces';
import useSizeScreen from '../../hooks/useSizeScreen';
import {
  Container,
  Wrap,
  Background,
  Splash,
  Device,
  Title,
} from './Hero.styled';

const Hero = ({ currentUser }: { currentUser: IUser }) => {
  const isSizeScreen = useSizeScreen();

  return (
    <Container>
      <Title>
        Movie <br />
        Change the world
      </Title>
      <Wrap>
        <Background>
          <Splash>
            <Image
              src="/Splash-min.png"
              alt="Splash"
              layout="fill"
              objectFit="contain"
            />
          </Splash>
          <Device>
            {isSizeScreen === 'phone' && (
              <Image
                src="/IPhone-min.png"
                alt="Phone"
                layout="fill"
                objectFit="contain"
              />
            )}
            {isSizeScreen === 'tablet' && (
              <Image
                src="/Ipad-min.png"
                alt="Tablet"
                layout="fill"
                objectFit="contain"
              />
            )}
            {isSizeScreen === 'laptop' && (
              <Image
                src="/MacBook Pro-min.png"
                alt="Laptop"
                width={900}
                height={580}
              />
            )}
          </Device>
        </Background>
        <AppLink currentUser={currentUser} />
      </Wrap>
    </Container>
  );
};

export default Hero;
