import React, { useMemo } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useContas } from "@stores/useContasStore";
import { useTheme } from "react-native-paper";

export function ResumoPizza() {
  const contas = useContas();
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const data = useMemo(() => {
    const categoriaMap = new Map<string, number>();

    contas.forEach(({ categoria, valor }) => {
      categoriaMap.set(categoria, (categoriaMap.get(categoria) || 0) + valor);
    });

    return Array.from(categoriaMap.entries()).map(([categoria, value], index) => ({
      name: categoria,
      population: value,
      color: generateColorFromString(categoria),
      legendFontColor: colors.onBackground,
      legendFontSize: 14,
    }));
  }, [contas]);

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ color: colors.onBackground }}>Nenhuma conta para mostrar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Gastos por Categoria</Text>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => colors.primary,
          labelColor: () => colors.onBackground,
        }}
        accessor={"population"}
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

function generateColorFromString(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
});
