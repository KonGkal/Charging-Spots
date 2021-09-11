import React, { FC } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";

const NavFooter: FC = () => {
  const history = useHistory();
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => history.push("/")}>
        <Text>Home</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => history.push("/map")}>
        <Text>Map</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  pressable: {
    width: 70,
    margin: 5,
    padding: 6,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default NavFooter;
