import React, { useState } from "react";
import { Modal } from "react-native";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import CategorySelect from "../CategorySelect";
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
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState({
    key: "categoria",
    name: "category",
  });

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleSetCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Modal
        visible={categoryModalOpen}
        onRequestClose={handleCloseCategoryModal}
      >
        <CategorySelect
          category={selectedCategory}
          setCategory={(category) => handleSetCategory(category)}
          closeSelectCategory={handleCloseCategoryModal}
        />
      </Modal>
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
          <Select
            title={selectedCategory.name}
            onPress={() => handleOpenCategoryModal()}
          />
        </Fields>

        <Button
          title="Enviar"
          onPress={() => console.log("zzz", selectedCategory)}
        />
      </Form>
    </Container>
  );
};

export default Register;
