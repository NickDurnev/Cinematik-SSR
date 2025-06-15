"use client";
import Image from "next/image";

import { AppLink } from "@/app/(app)/components";
import { Show } from "@/components";
import useSizeScreen from "@/hooks/useSizeScreen";

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
            <Show when={isSizeScreen === "phone"}>
              <Image
                src="/IPhone-min.png"
                alt="Phone"
                layout="fill"
                objectFit="contain"
              />
            </Show>
            <Show when={isSizeScreen === "tablet"}>
              <Image
                src="/Ipad-min.png"
                alt="Tablet"
                layout="fill"
                objectFit="contain"
              />
            </Show>
            <Show when={isSizeScreen === "laptop"}>
              <Image
                src="/MacBook Pro-min.png"
                alt="Laptop"
                width={900}
                height={580}
              />
            </Show>
          </Device>
        </Background>
        <AppLink />
      </Wrap>
    </Container>
  );
};

export default Hero;
