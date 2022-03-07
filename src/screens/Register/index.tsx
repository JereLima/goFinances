import React, { useState } from "react";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

const Register = () => {
  const [transactionType, setTransactionType] = useState("up");

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Crie aqui</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Valor" />

          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Entradas"
              isActive={transactionType === "up"}
              onPress={() => handleTransactionTypeSelect("up")}
            ></TransactionTypeButton>
            <TransactionTypeButton
              type="down"
              title="Saídas"
              isActive={transactionType === "down"}
              onPress={() => handleTransactionTypeSelect("down")}
            ></TransactionTypeButton>
          </TransactionTypes>
          <Select />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};

export default Register;
