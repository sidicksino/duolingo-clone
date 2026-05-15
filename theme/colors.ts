export const colors = {
  brand: {
    SinoLingoPurple: "#6C4EF5",
    SinoLingoDeepPurple: "#5B3BF6",
    SinoLingoBlue: "#4D8BFF",
    SinoLingoGreen: "#21C16B",
  },
  semantic: {
    success: "#21C16B",
    warning: "#FFC800",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D8BFF",
  },
  neutral: {
    textPrimary: "#0D132B",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },
} as const;

export const colorTokens = {
  "SinoLingo-purple": colors.brand.SinoLingoPurple,
  "SinoLingo-deep-purple": colors.brand.SinoLingoDeepPurple,
  "SinoLingo-blue": colors.brand.SinoLingoBlue,
  "SinoLingo-green": colors.brand.SinoLingoGreen,
  success: colors.semantic.success,
  warning: colors.semantic.warning,
  streak: colors.semantic.streak,
  error: colors.semantic.error,
  info: colors.semantic.info,
  "text-primary": colors.neutral.textPrimary,
  "text-secondary": colors.neutral.textSecondary,
  border: colors.neutral.border,
  surface: colors.neutral.surface,
  background: colors.neutral.background,
} as const;

export type ColorToken = keyof typeof colorTokens;
