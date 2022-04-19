import React from "react";
import { FlatList, View } from "react-native";
import { categories } from "../../utils/categories";
import Button from "../../components/Form/Button";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: Props) => {
  const handleSaveCategorySelected = (category: Category) => {
    setCategory(category);
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSaveCategorySelected(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <GestureHandlerRootView>
          <Button title="Selecionar" onPress={closeSelectCategory} />
        </GestureHandlerRootView>
      </Footer>
    </Container>
  );
};

export default CategorySelect;
