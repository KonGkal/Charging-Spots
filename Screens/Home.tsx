import React, { FC } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import globalStyles from "../globalStyles/globalStyles";

const Home: FC = () => {
  const history = useHistory();
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>ev.energy charging</Text>
      <Text>Cheaper, greener, simpler</Text>
      <Text>electric vehicle charging</Text>
      <Text>for everyone</Text>
      <Pressable style={styles.pressable} onPress={() => history.push("/map")}>
        <Text style={globalStyles.buttonText}>Map</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    margin: 5,
    padding: 6,
    backgroundColor: "#6b4",
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Home;
