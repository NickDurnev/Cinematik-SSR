import Image from "next/image";
//#Services
import useSizeScreen from "../../hooks/useSizeScreen";
import AppLink from "../AppLink/AppLink";
//#Styles
import {
  Background,
  Container,
  Device,
  Splash,
  Title,
  Wrap,
} from "./Hero.styled";

const Hero = () => {
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
            {isSizeScreen === "phone" && (
              <Image
                src="/IPhone-min.png"
                alt="Phone"
                layout="fill"
                objectFit="contain"
              />
            )}
            {isSizeScreen === "tablet" && (
              <Image
                src="/Ipad-min.png"
                alt="Tablet"
                layout="fill"
                objectFit="contain"
              />
            )}
            {isSizeScreen === "laptop" && (
              <Image
                src="/MacBook Pro-min.png"
                alt="Laptop"
                width={900}
                height={580}
              />
            )}
          </Device>
        </Background>
        <AppLink />
      </Wrap>
    </Container>
  );
};

export default Hero;
