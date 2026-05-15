import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const socialButtons = [
  {
    label: "Continue with Google",
    icon: "logo-google",
    color: "#4285F4",
  },
  {
    label: "Continue with Facebook",
    icon: "logo-facebook",
    color: "#1877F2",
  },
  {
    label: "Continue with Apple",
    icon: "logo-apple",
    color: colors.neutral.textPrimary,
  },
] as const;

const authCopy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    email: "alex@gmail.com",
    button: "Sign Up",
    footerText: "Already have an account?",
    footerAction: "Log in",
    footerHref: "/sign-in",
    accessibilityLabel: "SinoLingo mascot welcoming a new learner",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    email: "alex@gmail.com",
    button: "Sign In",
    footerText: "Don't have an account?",
    footerAction: "Sign up",
    footerHref: "/sign-up",
    accessibilityLabel: "SinoLingo mascot welcoming a returning learner",
  },
} as const;

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState<string>(authCopy[mode].email);
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const copy = authCopy[mode];
  const isSignUp = mode === "sign-up";

  const openVerification = () => {
    setVerificationCode("");
    setVerificationVisible(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleCodeChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);

    setVerificationCode(digits);

    if (digits.length === 6) {
      Keyboard.dismiss();
      setVerificationVisible(false);
      router.replace("/");
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/onboarding");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="auth__screen">
        <Pressable
          accessibilityLabel="Go back"
          className="auth__back-button"
          hitSlop={12}
          onPress={goBack}
        >
          <Ionicons
            color={colors.neutral.textPrimary}
            name="chevron-back"
            size={35}
          />
        </Pressable>

        <View className="auth__header">
          <Text className="auth__title">{copy.title}</Text>
          <Text className="auth__subtitle">{copy.subtitle}</Text>
        </View>

        <View className="auth__mascot-wrap">
          <Text className="auth__sparkle auth__sparkle--orange-left">✦</Text>
          <Text className="auth__sparkle auth__sparkle--blue">✦</Text>
          <Text className="auth__sparkle auth__sparkle--yellow">✦</Text>
          <Image
            accessibilityLabel={copy.accessibilityLabel}
            className="auth__mascot"
            resizeMode="contain"
            source={images.mascotAuth}
          />
        </View>

        <View className="auth__form">
          <View className="auth__input-shell">
            <Text className="auth__input-label">Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={colors.neutral.textSecondary}
              style={{
                color: colors.neutral.textPrimary,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                lineHeight: 28,
                margin: 0,
                padding: 0,
              }}
              value={email}
            />
          </View>

          {isSignUp ? (
            <View className="auth__input-shell auth__input-shell--password">
              <Text className="auth__input-label">Password</Text>
              <View className="auth__password-row">
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.neutral.textSecondary}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  style={{
                    color: colors.neutral.textPrimary,
                    fontFamily: "Poppins-Regular",
                    fontSize: 20,
                    lineHeight: 28,
                    margin: 0,
                    padding: 0,
                    flex: 1,
                  }}
                  value={password}
                />
                <Pressable
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  hitSlop={12}
                >
                  <Ionicons
                    color="#747D9B"
                    name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                    size={31}
                  />
                </Pressable>
              </View>
            </View>
          ) : null}

          <Pressable
            className="auth__primary-button"
            onPress={openVerification}
          >
            <Text className="auth__primary-label">{copy.button}</Text>
          </Pressable>
        </View>

        <View className="auth__divider-row">
          <View className="auth__divider-line" />
          <Text className="auth__divider-text">or continue with</Text>
          <View className="auth__divider-line" />
        </View>

        <View className="auth__social-list">
          {socialButtons.map((button) => (
            <Pressable className="auth__social-button" key={button.label}>
              <View className="auth__social-icon">
                <Ionicons color={button.color} name={button.icon} size={34} />
              </View>
              <Text className="auth__social-label">{button.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="auth__footer">
          <Text className="auth__footer-text">{copy.footerText} </Text>
          <Link asChild href={copy.footerHref}>
            <Pressable>
              <Text className="auth__footer-action">{copy.footerAction}</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <Modal animationType="slide" transparent visible={isVerificationVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalAvoider}
        >
          <Pressable
            accessibilityLabel="Dismiss keyboard"
            onPress={Keyboard.dismiss}
            className="flex-1 justify-end px-5 pb-5"
            style={{ backgroundColor: "rgba(13, 19, 43, 0.4)" }}
          >
            <Pressable className="rounded-7 bg-neutral-background px-6 pt-6.5 pb-7">
              <View className="items-center">
                <View className="auth__modal-icon">
                  <Ionicons
                    color={colors.brand.SinoLingoDeepPurple}
                    name="mail"
                    size={30}
                  />
                </View>
                <Text className="auth__modal-title">Check your email</Text>
                <Text className="auth__modal-body">
                  You received an email with a verification code. Enter it below
                  to continue.
                </Text>

                <TextInput
                  autoFocus
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={handleCodeChange}
                  placeholder="000000"
                  placeholderTextColor={colors.neutral.textSecondary}
                  ref={inputRef}
                  style={{
                    width: "100%",
                    height: 64,
                    borderWidth: 1,
                    borderColor: colors.neutral.border,
                    borderRadius: 18,
                    color: colors.neutral.textPrimary,
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 28,
                    letterSpacing: 14,
                    marginTop: 22,
                    paddingHorizontal: 22,
                    textAlign: "center",
                  }}
                  value={verificationCode}
                />
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  modalAvoider: {
    flex: 1,
  },
});
