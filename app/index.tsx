import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const swatches = [
  { label: "Purple", className: "bg-SinoLingo-purple" },
  { label: "Deep", className: "bg-SinoLingo-deep-purple" },
  { label: "Blue", className: "bg-SinoLingo-blue" },
  { label: "Green", className: "bg-SinoLingo-green" },
] as const;

export default function Index() {
  return (
    <View className="ds-screen justify-center px-6">
      <View className="ds-card p-6">
        <Text className="ds-label text-SinoLingo-purple">Design System</Text>
        <Text className="ds-text--h1 mt-3 text-SinoLingo-purple">
          SinoLingo
        </Text>
        <Text className="ds-text--body-medium mt-3 text-text-secondary">
          Poppins, brand colors, semantic colors, neutrals, and reusable
          NativeWind utilities are ready.
        </Text>

        <Link asChild href="/onboarding">
          <Pressable className="mt-6 h-14 items-center justify-center rounded-2xl bg-SinoLingo-purple">
            <Text className="font-poppins-semibold text-base text-white">
              Open onboarding
            </Text>
          </Pressable>
        </Link>

        <View className="my-6 ds-divider" />

        <View className="flex-row gap-3">
          {swatches.map((swatch) => (
            <View className="flex-1 gap-2" key={swatch.label}>
              <View className={`h-14 ${swatch.className} ds-swatch`} />
              <Text className="ds-text--caption text-center">
                {swatch.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
