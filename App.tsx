import React from "react";
import { SafeAreaView } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Home from "./Screens/Home";
import Map from "./Screens/Map";
import ChargingPoint from "./Screens/ChargingPoint";
import globalStyles from "./globalStyles/globalStyles";

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={Map} />
          <Route
            exact
            path="/chargingpoint/:id/:title"
            component={ChargingPoint}
          />
        </Switch>
      </NativeRouter>
    </SafeAreaView>
  );
}
