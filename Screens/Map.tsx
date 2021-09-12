import { SafeAreaView, StyleSheet, Dimensions, View, Text } from "react-native";
import React, { useRef, useEffect, useState, FC } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useHistory } from "react-router-native";
import * as Location from "expo-location";
import * as Localization from "expo-localization";
import { getChargingSpots } from "../services/apiServices";
import globalStyles from "../globalStyles/globalStyles";

const Map: FC = () => {
  const [chargingSpots, setChargingSpots] = useState<SpotData[]>();
  const mapView = useRef<MapView>(null);
  const history = useHistory();

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

          region &&
            userLocation &&
            (await handleApiResponse(region, userLocation));

          locationSuccess = true;
        } catch (error) {
          console.log("retrying....");
        }
      }
    })();
  }, []);

  async function handleApiResponse(region: string, userLocation: Region) {
    const spots = await getChargingSpots(
      region,
      userLocation.latitude,
      userLocation.longitude
    );

    centerToUser(userLocation);

    spots.data && setChargingSpots(spots.data);
  }

  function centerToUser(userLocation: Region): void {
    mapView.current?.animateToRegion(userLocation, 1000);
  }

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

        return (
          <Marker key={ID} coordinate={spotLocation}>
            <Callout
              onPress={() => history.push(`/chargingpoint/${ID}/${Title}`)}
            >
              <View style={globalStyles.container}>
                <Text style={globalStyles.text}>{Title}</Text>
                <Text style={globalStyles.text}>{ID}</Text>
                <Text style={globalStyles.text}>
                  Press to select charging spot
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      })
    : null;

  return (
    <SafeAreaView>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        ref={mapView}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        zoomEnabled
        showsCompass
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

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
