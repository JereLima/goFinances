import React from 'react';
import {TextInputProps} from 'react-native';
 
type  Props = TextInputProps;

import { Container } from './styles';

const Input = ({...rest}: Props) => {
  return <Container {...rest} />;
}

export default Input;