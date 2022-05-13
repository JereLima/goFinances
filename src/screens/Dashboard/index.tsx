import React, { useCallback, useLayoutEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

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
  User,
  LogoutButton,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expansive: HighlightProps;
  total: HighlightProps;
}

const Dashboard = () => {
  const theme = useTheme();
  const { sigOut, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const dataKey = `@goFinances:transactions:${user.id}`;

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem(dataKey);
    const transactions = data ? JSON.parse(data) : [];

    let entriesTotal = 0;
    let expansiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expansiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionsFormated);
    const totalValue = entriesTotal - expansiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expansive: {
        amount: expansiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: totalValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  console.log("data", data);

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserProfile>
            <ImageProfile
              source={{
                uri: user.photo,
              }}
            />

            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserProfile>

          <LogoutButton onPress={() => sigOut()}>
            <Icon name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <HighLightCards>
            <HighLightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
            />
            <HighLightCard
              type="down"
              title="Saídas"
              amount={highlightData.expansive.amount}
            />
            <HighLightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
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
        </>
      )}
    </Container>
  );
};

export default Dashboard;
