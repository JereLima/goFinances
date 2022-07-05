import React from "react";
import { Button, View, Text, TextInput } from "react-native";

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput testID="input-name" placeholder="name" value="Jere"/>
      <TextInput testID="input-surname" placeholder="surname" value="lima" />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export default Profile;
