import React, { useState } from "react";
import { Modal, Keyboard, Alert, TouchableWithoutFeedback } from "react-native";
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
import InputForm from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  amount: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é Obrigatório!"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Valor Obrigatório"),
});
const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState({
    key: "categoria",
    name: "category",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (form: FormData) => {
    if (!transactionType) {
      Alert.alert("Selecione o tipo da transação!");
      return;
    }

    if (selectedCategory.key === "categoria") {
      Alert.alert("Selecione uma categoria");
      return;
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: selectedCategory.key,
    };

    console.log(data);
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="characters"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              control={control}
              name="amount"
              placeholder="Valor"
              autoCapitalize="words"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
