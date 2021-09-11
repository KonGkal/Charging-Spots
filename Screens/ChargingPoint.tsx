import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useParams } from "react-router-native";
import NavFooter from "../Components/NavFooter";
import globalStyles from "../globalStyles/globalStyles";
import { startCharging } from "../services/apiServices";

const ChargingPoint: FC = () => {
  const [charging, setCharging] = useState<boolean>(false);
  const { id, title } = useParams<{ id: string; title: string }>();

  const handleCharging = (): void => {
    startCharging(1, 1, +id);
    setCharging(!charging);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={globalStyles.text}>{title}</Text>
        <Text style={globalStyles.text}>Charging Point Id: {id}</Text>
        <Pressable
          style={
            charging
              ? [styles.pressable, { backgroundColor: "red" }]
              : [styles.pressable, { backgroundColor: "#6b4" }]
          }
          onPress={handleCharging}
        >
          <Text>{charging ? "Stop Charging" : "Start Charging"}</Text>
        </Pressable>
      </View>
      <NavFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
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
export default ChargingPoint;
