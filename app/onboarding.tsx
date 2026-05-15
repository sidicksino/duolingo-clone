import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function OnboardingScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
    >
      <View className="flex-1 px-10 pb-8 pt-4">
        <View className="items-center">
          <View className="flex-row items-center justify-center">
            <Image
              accessibilityLabel="SinoLingo mascot logo"
              className="onboarding__logo-image"
              resizeMode="contain"
              source={images.mascotLogo}
            />
            <Text className="onboarding__brand">SinoLingo</Text>
          </View>
        </View>

        <View className="onboarding__intro">
          <Text className="onboarding__headline">
            Your AI language{"\n"}
            <Text className="onboarding__headline-accent">teacher.</Text>
          </Text>
          <Text className="onboarding__body">
            Real conversations, personalized{"\n"}
            lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="relative mt-6 flex-1">
          <View className="onboarding__bubble onboarding__bubble--hello">
            <Text className="onboarding__bubble-text onboarding__bubble-text--hello">
              Hello!
            </Text>
            <View className="onboarding__bubble-tail onboarding__bubble-tail--hello" />
          </View>

          <View className="onboarding__bubble onboarding__bubble--hola">
            <Text className="onboarding__bubble-text onboarding__bubble-text--hola">
              ¡Hola!
            </Text>
            <View className="onboarding__bubble-tail onboarding__bubble-tail--hola" />
          </View>

          <View className="onboarding__bubble onboarding__bubble--ni-hao">
            <Text className="onboarding__bubble-text onboarding__bubble-text--ni-hao">
              你好!
            </Text>
            <View className="onboarding__bubble-tail onboarding__bubble-tail--ni-hao" />
          </View>

          <Image
            accessibilityLabel="SinoLingo mascot waving with a backpack"
            className="onboarding__mascot"
            resizeMode="contain"
            source={images.mascotWelcome}
          />
        </View>

        <Link asChild href="/">
          <Pressable className="onboarding__button">
            <Text className="onboarding__button-label">Get Started</Text>
            <View className="onboarding__button-icon">
              <Ionicons
                color={colors.neutral.background}
                name="chevron-forward"
                size={34}
              />
            </View>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
