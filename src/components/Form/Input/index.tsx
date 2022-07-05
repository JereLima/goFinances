import React from "react";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  active?: boolean;
}

import { Container } from "./styles";

const Input = ({ active, ...rest }: Props) => {
  return <Container {...rest} />;
};

export default Input;
