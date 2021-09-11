import React from "react";
import { View, Text, Pressable } from "react-native";
import { useHistory } from "react-router-native";

const NavFooter = () => {
  const history = useHistory();
  return (
    <View>
      <Pressable onPress={() => history.push("/")}>
        <Text>Home</Text>
      </Pressable>
      <Pressable onPress={() => history.push("/map")}>
        <Text>Map</Text>
      </Pressable>
    </View>
  );
};

export default NavFooter;
