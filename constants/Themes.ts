// theme.ts
import {
  MD3Theme,
  adaptNavigationTheme,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from "react-native-paper";

// Tipos que você já tem
export type MD3ElevationColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
};

export type MD3Colors = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: MD3ElevationColors;
};

// Tema Dracula Dark
const draculaColors: MD3Colors = {
  primary: "#bd93f9",
  primaryContainer: "#4b367c",
  secondary: "#6272a4",
  secondaryContainer: "#44475a",
  tertiary: "#8be9fd",
  tertiaryContainer: "#2a374f",

  surface: "#282a36",
  surfaceVariant: "#44475a",
  surfaceDisabled: "#3e4054",

  background: "#282a36",

  error: "#ff5555",
  errorContainer: "#660000",

  onPrimary: "#282a36",
  onPrimaryContainer: "#e6dfff",

  onSecondary: "#f8f8f2",
  onSecondaryContainer: "#e0e1ff",

  onTertiary: "#282a36",
  onTertiaryContainer: "#d3f0ff",

  onSurface: "#f8f8f2",
  onSurfaceVariant: "#c5c6d0",
  onSurfaceDisabled: "#888a9b",

  onError: "#ffffff",
  onErrorContainer: "#ffaaaa",

  onBackground: "#f8f8f2",

  outline: "#6272a4",
  outlineVariant: "#44475a",

  inverseSurface: "#f8f8f2",
  inverseOnSurface: "#282a36",

  inversePrimary: "#7a4fff",

  shadow: "#000000",
  scrim: "rgba(0,0,0,0.6)",
  backdrop: "rgba(40,42,54,0.8)",

  elevation: {
    level0: "transparent",
    level1: "rgba(189,147,249,0.05)",
    level2: "rgba(189,147,249,0.08)",
    level3: "rgba(189,147,249,0.11)",
    level4: "rgba(189,147,249,0.12)",
    level5: "rgba(189,147,249,0.14)",
  },
};

// Tema Rosa Pastel Light
const pastelPinkColors: MD3Colors = {
  primary: "#f48fb1",
  primaryContainer: "#f8bbd0",
  secondary: "#ce93d8",
  secondaryContainer: "#e1bee7",
  tertiary: "#81d4fa",
  tertiaryContainer: "#b3e5fc",

  surface: "#ffffff",
  surfaceVariant: "#f3e5f5",
  surfaceDisabled: "#f8bbd0",

  background: "#fff0f5",

  error: "#b00020",
  errorContainer: "#fcdede",

  onPrimary: "#ffffff",
  onPrimaryContainer: "#4a0033",

  onSecondary: "#4a0072",
  onSecondaryContainer: "#4a0072",

  onTertiary: "#003c54",
  onTertiaryContainer: "#003c54",

  onSurface: "#000000",
  onSurfaceVariant: "#5f5f5f",
  onSurfaceDisabled: "#cfcfcf",

  onError: "#ffffff",
  onErrorContainer: "#7f0000",

  onBackground: "#000000",

  outline: "#ce93d8",
  outlineVariant: "#e1bee7",

  inverseSurface: "#000000",
  inverseOnSurface: "#ffffff",

  inversePrimary: "#ad1457",

  shadow: "#000000",
  scrim: "rgba(0,0,0,0.12)",
  backdrop: "rgba(255,182,193,0.3)",

  elevation: {
    level0: "transparent",
    level1: "rgba(244,143,177,0.05)",
    level2: "rgba(244,143,177,0.08)",
    level3: "rgba(244,143,177,0.11)",
    level4: "rgba(244,143,177,0.12)",
    level5: "rgba(244,143,177,0.14)",
  },
};

// Adaptando tema de navegação para combinar com os temas Paper
const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: {
      dark: false,

      colors: {
        primary: pastelPinkColors.primary,
        background: pastelPinkColors.background,
        card: pastelPinkColors.surface,
        text: pastelPinkColors.onSurface,
        border: pastelPinkColors.outline,
        notification: pastelPinkColors.primary,
      },
    },
    reactNavigationDark: {
      dark: true,
      colors: {
        primary: draculaColors.primary,
        background: draculaColors.background,
        card: draculaColors.surface,
        text: draculaColors.onSurface,
        border: draculaColors.outline,
        notification: draculaColors.primary,
      },
    },
  });

// Exportando os temas completos MD3Theme para React Native Paper e React Navigation
export const draculaTheme: MD3Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: draculaColors,
  roundness: 8,
};

export const pastelPinkTheme: MD3Theme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: pastelPinkColors,
  roundness: 8,
};
