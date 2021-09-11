import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
    })();
  }, []);
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
