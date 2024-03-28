import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hidng before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loader, error] = useFonts({
    PTSer: require("@assets/fonts/PTSerifCaption-Regular.ttf"),
    "PTSer-i": require("@assets/fonts/PTSerifCaption-Italic.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loader) {
      SplashScreen.hideAsync();
    }
  }, [loader]);

  if (!loader) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modals)/[provinceName]"
        options={{ presentation: "modal", animation: "fade_from_bottom" }}
      />
    </Stack>
  );
};

export default RootLayout;
