import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  type: "up" | "down";
  title: string;
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
const TransactionTypeButton = ({ type, title, isActive, ...rest }: Props) => {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} isActive={isActive}/>
      <Title isActive={isActive}>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;
