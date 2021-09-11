import React from "react";
import { FC } from "react-router/node_modules/@types/react";
import { Pressable, View, Text } from "react-native";
import { useHistory } from "react-router-native";

const Home: FC = () => {
  const history = useHistory();
  return (
    <View>
      <Text>ev.Energy charging</Text>
      <Pressable onPress={() => history.push("/map")}>
        <Text>Map</Text>
      </Pressable>
    </View>
  );
};

export default Home;
