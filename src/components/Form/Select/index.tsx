import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Category, Container, Icon } from "./styles";

interface Props extends TouchableOpacityProps {
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
