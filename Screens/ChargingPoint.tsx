import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useParams } from "react-router-native";
import globalStyles from "../globalStyles/globalStyles";

const ChargingPoint: FC = () => {
  const { id, title } = useParams<{ id: string; title: string }>();

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>Charging Point Id: {id}</Text>
      </View>
    </View>
  );
};

export default ChargingPoint;
