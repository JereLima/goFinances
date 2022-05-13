import React, { useEffect, useState } from "react";
import { Modal, Keyboard, Alert, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
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
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

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
  const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState({
    key: "categoria",
    name: "category",
  });

  const { user } = useAuth();

  const dataKey = `@goFinances:transactions:${user.id}`;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (form: FormData) => {
    if (!transactionType) {
      Alert.alert("Selecione o tipo da transação!");
      return;
    }

    if (selectedCategory.key === "categoria") {
      Alert.alert("Selecione uma categoria");
      return;
    }

    const newTransaction = {
      id: String(uuid.v4()),
      date: new Date(),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: selectedCategory.key,
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [...currentData, newTransaction];

      setSelectedCategory({ key: "category", name: "categoria" });
      setTransactionType("");
      reset();
      navigation.navigate("Listagem");

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));
    } catch (error) {
      Alert.alert("Não foi possível salvar no momento!");
    }
  };

  const handleTransactionTypeSelect = (type: "positive" | "negative") => {
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

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(dataKey);
    };

    loadData();

    // const removeAll = async() => {
    //   await AsyncStorage.removeItem(dataKey);
    // }

    // removeAll();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Modal
          visible={categoryModalOpen}
          onRequestClose={handleCloseCategoryModal}
          animationType="slide"
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
                isActive={transactionType === "positive"}
                onPress={() => handleTransactionTypeSelect("positive")}
              ></TransactionTypeButton>
              <TransactionTypeButton
                type="down"
                title="Saídas"
                isActive={transactionType === "negative"}
                onPress={() => handleTransactionTypeSelect("negative")}
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
