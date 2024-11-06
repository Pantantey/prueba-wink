import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold } from "@expo-google-fonts/red-hat-display";
import * as SplashScreen from "expo-splash-screen";

// Screens
import Home from "./screens/Home";
import Detail from "./screens/Detail";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: { fontsLoaded: boolean };
  Detail: { fontsLoaded: boolean };
};

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
  });

  //hide splashScreen
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => <Home {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>
        
        <Stack.Screen
          name="Detail"
          options={{
            title: 'Detalle de movimiento',
            headerTintColor: '#4C51F7',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: fontsLoaded ? { fontFamily: "RedHatDisplay_700Bold", fontSize: 16 } : {},
          }}
        >
          {(props) => <Detail {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
