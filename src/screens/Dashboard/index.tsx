import React from "react";
import { HighLightCard } from "../../components";
import {
  Container,
  Header,
  UserContainer,
  UserProfile,
  ImageProfile,
  UserGreeting,
  UserName,
  Text,
  User,
  Icon,
  HighLightCards,
} from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <Header>
        <UserContainer>
          <UserProfile>
            <ImageProfile
              source={{
                uri: "https://avatars.githubusercontent.com/u/69019443?s=96&v=4",
              }}
            />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Jeremias Lima</UserName>
            </User>
          </UserProfile>
          <Icon name="power" />
        </UserContainer>
      </Header>
      <HighLightCards>
        <HighLightCard type="up" title="Entradas" amount="12000" lastTransactions="teste"/>
        <HighLightCard type="down" title="Saídas" amount="12000" lastTransactions="teste"/>
        <HighLightCard type="total" title="Total" amount="5000" lastTransactions="xaxaxax"/>
      </HighLightCards>
    </Container>
  );
};

export default Dashboard;
