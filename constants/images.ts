import type { ImageSourcePropType } from "react-native";

export const images = {
  androidIconBackground: require("../assets/images/android-icon-background.png"),
  androidIconForeground: require("../assets/images/android-icon-foreground.png"),
  androidIconMonochrome: require("../assets/images/android-icon-monochrome.png"),
  earth: require("../assets/images/earth.png"),
  favicon: require("../assets/images/favicon.png"),
  icon: require("../assets/images/icon.png"),
  mascotAuth: require("../assets/images/mascot-auth.png"),
  mascotLogo: require("../assets/images/moscot-logo.png"),
  mascotWelcome: require("../assets/images/mascot-welcome.png"),
  palace: require("../assets/images/palace.png"),
  partialReactLogo: require("../assets/images/partial-react-logo.png"),
  reactLogo: require("../assets/images/react-logo.png"),
  splashIcon: require("../assets/images/splash-icon.png"),
  streakFire: require("../assets/images/streak-fire.png"),
  treasure: require("../assets/images/treasure.png"),
} satisfies Record<string, ImageSourcePropType>;
