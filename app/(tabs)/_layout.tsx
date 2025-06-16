import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper"; // tema do Paper aqui
import { Tabs } from "expo-router";

export default function Layout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outline,
          borderBottomWidth: 1,
          elevation: 0, // remover sombra padrão se quiser
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outline,
          borderBottomWidth: 1,
          elevation: 0,
        },
        headerTitleAlign: "center",
        headerTintColor: theme.colors.onSurface, // cor do texto do header
      }}
      initialRouteName="resumo"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="resumo"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assessment" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="graficos"
        options={{
          title: "Graficos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
        />
    </Tabs>
  );
}
