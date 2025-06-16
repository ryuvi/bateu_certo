import React, { useMemo, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useContas } from "@stores/useContasStore";
import { useTheme } from "react-native-paper";
import { formatValue } from "@/constants/Funcs";

export function ResumoPizzaPorGrupo() {
  const contas = useContas();
  const { colors } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const data = useMemo(() => {
    // Agrupa valores pelo campo 'grupo'
    const grupoMap = new Map<string, number>();

    contas.forEach(({ grupo, valor }) => {
      grupoMap.set(grupo, (grupoMap.get(grupo) || 0) + valor);
    });

    const entries = Array.from(grupoMap.entries());
    const total = entries.reduce((acc, [, value]) => acc + value, 0);

    return entries.map(([grupo, value], index) => ({
      name: grupo,
      population: value,
      color: generateColorFromString(grupo, index),
      legendFontColor: colors.onBackground,
      legendFontSize: 14,
      percentage: total ? (value / total) * 100 : 0,
    }));
  }, [contas, colors.onBackground]);

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ color: colors.onBackground }}>Nenhum gasto para mostrar</Text>
      </View>
    );
  }

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {data.map((item, i) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.legendItem, selectedIndex === i && { backgroundColor: colors.primary + "20" }]}
          onPress={() => setSelectedIndex(i === selectedIndex ? null : i)}
        >
          <View style={[styles.colorBox, { backgroundColor: item.color }]} />
          <Text style={[styles.legendText, { color: colors.onBackground }]}>
            {item.name} - {formatValue(item.population)} ({item.percentage.toFixed(1)}%)
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Gastos por Grupo</Text>

      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => colors.primary,
          labelColor: () => colors.onBackground,
          propsForLabels: { fontSize: 12 },
        }}
        accessor={"population"}
        backgroundColor="transparent"
        paddingLeft="15"
        absolute={false}
        hasLegend={false}
        avoidFalseZero
        center={[15,0]}
        style={{justifyContent: "center", alignItems: "center", marginHorizontal: 'auto'}}
      />

      {selectedIndex !== null && (
        <View style={[styles.tooltip, { borderColor: data[selectedIndex].color }]}>
          <Text style={{ color: colors.onBackground, fontWeight: "bold" }}>
            {data[selectedIndex].name}
          </Text>
          <Text style={{ color: colors.onBackground }}>
            {formatValue(data[selectedIndex].population)} ({data[selectedIndex].percentage.toFixed(1)}%)
          </Text>
        </View>
      )}

      {renderLegend()}
    </View>
  );
}

function generateColorFromString(text: string, index: number) {
  const baseHue = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0) + index * 40;
  const hue = baseHue % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
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
  legendContainer: {
    marginTop: 16,
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 6,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
  },
  tooltip: {
    position: "absolute",
    top: 80,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
