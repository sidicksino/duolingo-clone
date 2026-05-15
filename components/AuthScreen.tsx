import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";
import { useSignIn, useSignUp } from "@clerk/expo/legacy";

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
    email: "",
    button: "Sign Up",
    footerText: "Already have an account?",
    footerAction: "Log in",
    footerHref: "/sign-in",
    accessibilityLabel: "SinoLingo mascot welcoming a new learner",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Log in to continue your language journey ✨",
    email: "",
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
  const copy = authCopy[mode];

  // Clerk hooks for sign-in / sign-up flows
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setActiveSignIn,
  } = useSignIn();
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setActiveSignUp,
  } = useSignUp();

  useEffect(() => {
    if (!isVerificationVisible) {
      return;
    }

    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => cancelAnimationFrame(frame);
  }, [isVerificationVisible]);

  const openVerification = () => {
    Keyboard.dismiss();
    setVerificationCode("");

    (async () => {
      try {
        // basic email validation
        const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
        if (!isValidEmail) {
          Alert.alert("Invalid email", "Please enter a valid email address.");
          return;
        }
        if (mode === "sign-up") {
          if (!isSignUpLoaded || !signUp) return setVerificationVisible(true);
          // create a sign-up attempt and send an email code
          const res: any = await signUp.create({ emailAddress: email });
          if (res?.error) {
            console.warn("signUp.create error", res.error);
            Alert.alert(
              "Sign up error",
              res.error.longMessage ||
                res.error.message ||
                "Unable to create sign-up.",
            );
            return;
          }
          // send code via verification resource
          const sendRes: any = await (
            signUp as any
          ).verifications.emailAddress.sendEmailCode();
          if (sendRes?.error) {
            console.warn("sendEmailCode error", sendRes.error);
            Alert.alert(
              "Email error",
              sendRes.error.longMessage ||
                sendRes.error.message ||
                "Unable to send verification email.",
            );
            return;
          }
        } else {
          if (!isSignInLoaded || !signIn) return setVerificationVisible(true);
          // create a sign-in attempt and send an email code
          const res: any = await signIn.create({ identifier: email });
          if (res?.error) {
            console.warn("signIn.create error", res.error);
            Alert.alert(
              "Sign in error",
              res.error.longMessage ||
                res.error.message ||
                "Unable to create sign-in.",
            );
            return;
          }
          const sendRes: any = await (signIn as any).emailCode.sendCode();
          if (sendRes?.error) {
            console.warn("sendCode error", sendRes.error);
            Alert.alert(
              "Email error",
              sendRes.error.longMessage ||
                sendRes.error.message ||
                "Unable to send verification email.",
            );
            return;
          }
        }
      } catch (err) {
        console.warn("Clerk auth error", err);
        Alert.alert(
          "Auth error",
          "An unexpected error occurred. Check console for details.",
        );
      } finally {
        setVerificationVisible(true);
      }
    })();
  };

  const handleCodeChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);

    setVerificationCode(digits);

    if (digits.length === 6) {
      Keyboard.dismiss();
      (async () => {
        try {
          if (mode === "sign-up") {
            if (isSignUpLoaded && signUp) {
              await (signUp as any).verifications.emailAddress.verifyEmailCode({
                code: digits,
              });
              if ((signUp as any).createdSessionId && setActiveSignUp) {
                await setActiveSignUp({
                  session: (signUp as any).createdSessionId,
                });
              }
            }
          } else {
            if (isSignInLoaded && signIn) {
              await (signIn as any).emailCode.verifyCode({ code: digits });
              if ((signIn as any).createdSessionId && setActiveSignIn) {
                await setActiveSignIn({
                  session: (signIn as any).createdSessionId,
                });
              }
            }
          }
        } catch (err) {
          console.warn("Verification error", err);
        } finally {
          setVerificationVisible(false);
          router.replace("/");
        }
      })();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="auth__shell">
            <Pressable
              accessibilityLabel="Go back"
              className="auth__back-button"
              hitSlop={12}
              onPress={goBack}
            >
              <Ionicons
                color={colors.neutral.textPrimary}
                name="chevron-back"
                size={32}
              />
            </Pressable>

            <View className="flex-1 justify-between">
              <View>
                <View className="auth__header">
                  <Text className="auth__title">{copy.title}</Text>
                  <Text className="auth__subtitle">{copy.subtitle}</Text>
                </View>

                <View className="auth__mascot-wrap">
                  <Text className="auth__sparkle auth__sparkle--orange-left">
                    ✦
                  </Text>
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
                      autoComplete="email"
                      keyboardType="email-address"
                      onChangeText={setEmail}
                      placeholder="Email address"
                      placeholderTextColor={colors.neutral.textSecondary}
                      style={{
                        color: colors.neutral.textPrimary,
                        fontFamily: "Poppins-Regular",
                        fontSize: 17,
                        lineHeight: 24,
                        margin: 0,
                        padding: 0,
                      }}
                      textContentType="emailAddress"
                      value={email}
                    />
                  </View>

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
                    <Pressable
                      className="auth__social-button"
                      key={button.label}
                    >
                      <View className="auth__social-icon">
                        <Ionicons
                          color={button.color}
                          name={button.icon}
                          size={28}
                        />
                      </View>
                      <Text className="auth__social-label">{button.label}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="auth__footer">
                <Text className="auth__footer-text">{copy.footerText} </Text>
                <Link asChild href={copy.footerHref}>
                  <Pressable>
                    <Text className="auth__footer-action">
                      {copy.footerAction}
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent
        visible={isVerificationVisible}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalAvoider}
        >
          <Pressable
            className="flex-1 justify-end px-5 pb-5"
            onPress={() => {
              Keyboard.dismiss();
              setVerificationVisible(false);
            }}
            style={styles.modalBackdrop}
          >
            <Pressable
              className="auth__modal-card"
              onPress={(e) => e.stopPropagation()}
            >
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
                  textContentType="oneTimeCode"
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalAvoider: {
    flex: 1,
  },
  modalBackdrop: {
    backgroundColor: "rgba(13, 19, 43, 0.4)",
  },
});
