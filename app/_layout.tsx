import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { colors, fontAssets } from "@/theme";

// Clerk
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  if (!publishableKey) {
    // Helpful runtime warning for developers — missing publishable key prevents Clerk from sending emails
     
    console.warn(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set. Clerk will not initialize correctly without it.",
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: colors.neutral.background },
            headerShown: false,
          }}
        />
        <StatusBar backgroundColor={colors.neutral.background} style="dark" />
      </>
    </ClerkProvider>
  );
}
