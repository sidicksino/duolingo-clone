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
              className="h-[58px] w-[58px]"
              resizeMode="contain"
              source={images.mascotLogo}
            />
            <Text className="ml-3 font-poppins-bold text-[30px] leading-[38px] text-text-primary">
              SinoLingo
            </Text>
          </View>
        </View>

        <View className="mt-[70px]">
          <Text className="font-poppins-bold text-[36px] leading-[48px] text-text-primary">
            Your AI language{"\n"}
            <Text className="text-SinoLingo-deep-purple">teacher.</Text>
          </Text>
          <Text className="mt-5 font-poppins-regular text-[17px] leading-[30px] text-[#666E8B]">
            Real conversations, personalized{"\n"}
            lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="relative mt-6 flex-1">
          <View className="absolute left-1 top-4 rotate-[-7deg] rounded-2xl bg-[#EFF8FF] px-6 py-3">
            <Text className="font-poppins-medium text-[24px] leading-[32px] text-[#060A1F]">
              Hello!
            </Text>
            <View className="absolute bottom-[-9px] right-6 h-6 w-6 rotate-45 rounded-br-[5px] bg-[#EFF8FF]" />
          </View>

          <View className="absolute right-1 top-0 rotate-[11deg] rounded-2xl bg-[#F5F4FF] px-6 py-3">
            <Text className="font-poppins-medium text-[23px] leading-[31px] text-SinoLingo-deep-purple">
              ¡Hola!
            </Text>
            <View className="absolute bottom-[-9px] left-7 h-6 w-6 rotate-45 rounded-br-[5px] bg-[#F5F4FF]" />
          </View>

          <View className="absolute right-0 top-[116px] rotate-[10deg] rounded-2xl bg-[#FFF5EF] px-6 py-3">
            <Text className="font-poppins-medium text-[23px] leading-[31px] text-[#FF4D3D]">
              你好!
            </Text>
            <View className="absolute bottom-[-9px] left-7 h-6 w-6 rotate-45 rounded-br-[5px] bg-[#FFF5EF]" />
          </View>

          <Image
            accessibilityLabel="SinoLingo mascot waving with a backpack"
            className="absolute bottom-0 h-[390px] w-[390px] self-center"
            resizeMode="contain"
            source={images.mascotWelcome}
          />
        </View>

        <Link asChild href="/">
          <Pressable className="mt-7 h-[74px] flex-row items-center justify-center rounded-[23px] bg-SinoLingo-deep-purple">
            <Text className="font-poppins-semibold text-[20px] leading-[28px] text-white">
              Get Started
            </Text>
            <View className="absolute right-7">
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
