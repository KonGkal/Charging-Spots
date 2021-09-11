import React, { FC } from "react";
import { View, Text } from "react-native";
import { useParams } from "react-router-native";
import NavFooter from "../Components/NavFooter";

const ChargingPoint: FC = () => {
  const { id, title } = useParams<{ id: string; title: string }>();

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>Charging Point Id: {id}</Text>
      </View>
      <NavFooter />
    </View>
  );
};

export default ChargingPoint;
