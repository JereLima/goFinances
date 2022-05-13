import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigInTitle,
  Footer,
  FooterWrapper,
  Spacing,
} from "./styles";

import ButtonSocial from "../../components/Form/ButtonSocial";
import LogoSVG from "../../assets/icons/logo.svg";
import AppleSVG from "../../assets/icons/apple.svg";
import GoogleSVG from "../../assets/icons/google.svg";
import { AuthContext } from "../../AuthContext";
import { AuthProvider, useAuth } from "../../hooks/auth";
import { Platform } from "react-native";


const SigIn = () => {
  const { sigInWhitGoogle } = useAuth();

  const handleSigInWithGoogle = async () => {
    try {
      await sigInWhitGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}finanças de forma{"\n"}muito simples
          </Title>
          <SigInTitle>Faça seu login com{"\n"}uma das contas abaixo</SigInTitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <FooterWrapper>
          <ButtonSocial
            svg={GoogleSVG}
            title="Entrar com Google"
            onPress={handleSigInWithGoogle}
          />
          <Spacing />
         {Platform.OS === 'ios' && <ButtonSocial svg={AppleSVG} title="Entrar com Apple" />}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SigIn;
