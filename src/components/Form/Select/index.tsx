import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Category, Container, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

const Select = ({ title, ...rest }: Props) => {
  return (
    <Container activeOpacity={0.6} {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default Select;
