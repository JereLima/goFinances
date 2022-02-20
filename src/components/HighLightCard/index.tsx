import React from "react";
import { View } from "react-native";

import {
  Container,
  Header,
  Description,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  type: 'up'| 'down'|'total';
  title: string;
  amount: string;
  lastTransactions: string;
}

const  icon = {
  up: 'arrow-up-circle',
  down:'arrow-down-circle',
  total: 'dollar-sign'
}
const HighLightCard = ({type, title, amount, lastTransactions}: Props) => {
  return (
    <Container type={type}>
      <Header>
        <Description type={type} >{title}</Description>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Content>
        <Amount type={type} >{amount}</Amount>
        <LastTransaction type={type}>{lastTransactions}</LastTransaction>
      </Content>
    </Container>
  );
};

export default HighLightCard;
