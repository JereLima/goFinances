import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HistoryCard from "../../components/HistoryCard";
import { Container, Content, Header, Title } from "./styles";
import { categories } from "../../utils/categories";
import Button from "../../components/Form/Button";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: string;
  color: string;
}

const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const loadData = async () => {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];

    const expansive = responseFormated.filter(
      (expansive: TransactionData) => expansive.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expansive.forEach((expansive: TransactionData) => {
        if (expansive.category === category.key) {
          categorySum += Number(expansive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total,
        });
      }

      setTotalByCategories(totalByCategory);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Teste</Title>
      </Header>
      <Content>
        {totalByCategories.map((item, index) => (
          <Title key={index}>{item.name}</Title>
        ))}
      </Content>

      <Button onPress={() => loadData()} title="xçxl" />
    </Container>
  );
};

export default Resume;
