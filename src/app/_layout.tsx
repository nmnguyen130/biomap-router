import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "@/hooks/AuthContext";

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
    <AuthContextProvider>
      <RootLayoutNav />
    </AuthContextProvider>
  );
};

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inTabsGroup = segments[0] === "(tabs)";
    if (isAuthenticated && !inTabsGroup) {
      // Redirect to Map
      router.replace("(tabs)/map");
    } else if (isAuthenticated === false) {
      // Redirect to Login
      router.replace("(auth)/login");
    }
  }, [isAuthenticated]);

  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modals)/[provinceName]"
          options={{ presentation: "modal", animation: "fade_from_bottom" }}
        />
      </Stack>
    </AuthContextProvider>
  );
}

export default RootLayout;
