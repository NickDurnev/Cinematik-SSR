import Link from "next/link";

import { LoginButton } from "@/app/(app)/components";
import { Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";

//#Styles
import { useTheme } from "@mui/material/styles";
import { ButtonContainer, Container, CustomButton } from "./AppLink.styled";

const AppLink = () => {
  const theme = useTheme();
  const user = useUserStore((state: UserStore) => state.user);

  return (
    <Container>
      <Show when={user._id} fallback={<LoginButton />}>
        <div>
          <h3 style={{ color: "#fff" }}>
            Welcome <br />
            {user.name}
          </h3>
          <ButtonContainer>
            <CustomButton
              variant="text"
              sx={{ color: theme.palette.accentColor.main }}
              href="/api/auth/logout"
            >
              Logout
            </CustomButton>
            <Link
              href={`https://cinematikapplication.vercel.app/${user._id}`}
              passHref
            >
              <CustomButton
                sx={{ ml: "20px", color: theme.palette.accentColor.main }}
                variant="text"
              >
                Go to App
              </CustomButton>
            </Link>
          </ButtonContainer>
        </div>
      </Show>
    </Container>
  );
};

export default AppLink;
