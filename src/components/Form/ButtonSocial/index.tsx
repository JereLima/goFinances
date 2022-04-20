import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Container, Text, Wrapper } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const ButtonSocial = ({ svg: Svg, title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Wrapper>
        <Svg />

        <Text>{title}</Text>
      </Wrapper>
    </Container>
  );
};

export default ButtonSocial;
