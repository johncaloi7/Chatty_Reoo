import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/AuthScreen";
import StartScreen from "../screens/StartScreen";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const isAuth = useSelector(
    (state) => state.auth.token !== null && state.auth.token !== ""
  );

  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />}
      {!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
