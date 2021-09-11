import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as Localization from "expo-localization";
import { getChargingSpots } from "../services/apiServices";

const Map = () => {
  const [chargingSpots, setChargingSpots] = useState<SpotData[]>();
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let locationSuccess = false;
      while (!locationSuccess) {
        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          const { region } = await Localization.getLocalizationAsync();

          const userLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          };

          if (region && userLocation) {
            const spots = await getChargingSpots(
              region,
              userLocation.latitude,
              userLocation.longitude
            );

            spots.data && setChargingSpots(spots.data);
          }

          locationSuccess = true;
        } catch (error) {
          console.log("retrying....");
        }
      }
    })();
  }, []);

  const chargingSpotMarkers = chargingSpots
    ? chargingSpots.map((spot) => {
        const {
          ID,
          AddressInfo: { Title, Latitude, Longitude },
        } = spot;

        const spotLocation = {
          latitude: Latitude,
          longitude: Longitude,
        };

        return <Marker key={ID} coordinate={spotLocation} />;
      })
    : null;

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
      >
        {chargingSpotMarkers}
      </MapView>
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

interface SpotData {
  IsRecentlyVerified: boolean;
  DateLastVerified: string;
  ID: number;
  UUID: string;
  DataProviderID: number;
  OperatorID: number;
  UsageTypeID: number;
  AddressInfo: {
    ID: number;
    Title: string;
    AddressLine1: string;
    Town: string;
    StateOrProvince: string;
    Postcode: string;
    CountryID: number;
    Latitude: number;
    Longitude: number;
    DistanceUnit: number;
  };
  Connections: [
    {
      ID: number;
      ConnectionTypeID: number;
      StatusTypeID: number;
      LevelID: number;
      Amps: number;
      Voltage: number;
      PowerKW: number;
      CurrentTypeID: number;
      Quantity: number;
    }
  ];
  NumberOfPoints: number;
  StatusTypeID: number;
  DateLastStatusUpdate: string;
  DataQualityLevel: number;
  DateCreated: string;
  SubmissionStatusTypeID: number;
}
