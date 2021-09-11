import { SafeAreaView, StyleSheet, Dimensions, Text } from "react-native";
import React, { useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FC } from "react-router/node_modules/@types/react";

const Map: FC = () => {
  const mapView = useRef<MapView>(null);

  return (
    <SafeAreaView>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        ref={mapView}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        zoomEnabled
        style={styles.map}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
