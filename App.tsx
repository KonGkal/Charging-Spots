import React from "react";
import { SafeAreaView } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Home from "./Screens/Home";

export default function App() {
  return (
    <SafeAreaView>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </NativeRouter>
    </SafeAreaView>
  );
}
