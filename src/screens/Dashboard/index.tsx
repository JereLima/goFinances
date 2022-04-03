import React from "react";
import HighLightCard from "../../components/HighLightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

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
  LogoutButton,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$12.000,00",
      category: { name: "vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Venda de carro",
      amount: "R$7.000,00",
      category: { name: "vendas", icon: "truck" },
      date: "13/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Burgão",
      amount: "R$80,00",
      category: { name: "comida", icon: "shopping-bag" },
      date: "13/04/2020",
    },
  ];

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
          
          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>

      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount="12000"
          lastTransactions="teste"
        />
        <HighLightCard
          type="down"
          title="Saídas"
          amount="12000"
          lastTransactions="teste"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount="5000"
          lastTransactions="testes"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>
      </Transactions>

      <TransactionList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard data={item} />}
      />
    </Container>
  );
};

export default Dashboard;
