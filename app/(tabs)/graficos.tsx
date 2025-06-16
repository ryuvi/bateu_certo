import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, useTheme, Text } from "react-native-paper";
import { useContas } from "@stores/useContasStore";
import { formatDate, formatValue } from "@constants/Funcs";

import { ResumoPizza } from "@components/CategoriaGrafico";
import { ResumoPizzaPorGrupo } from "@components/GrupoGraficos"; // componente que criamos
import { exportarContasParaCSV } from "@/utils/csv";

export default function Graficos() {
  const contas = useContas();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const totalAPagar = contas.reduce((acc, c) => (c.pago ? acc : acc + c.valor), 0);
  const totalPago = contas.reduce((acc, c) => (c.pago ? acc + c.valor : acc), 0);
  const contasPendentes = contas.filter((c) => !c.pago);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      {/* Aqui entram os gráficos lado a lado (ou em coluna se preferir) */}
      <View style={styles.graficosContainer}>
        <View style={{...styles.card, ...styles.graficoItem}}>
          <ResumoPizza />
        </View>
        <View style={{...styles.card, ...styles.graficoItem}}>
          <ResumoPizzaPorGrupo />
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    card: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: colors.surfaceVariant,
      shadowColor: colors.shadow,
      elevation: 4,
    },
    label: {
      fontWeight: "600",
      marginBottom: 8,
      fontSize: 16,
      color: colors.onSurface,
    },
    value: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.onSurface,
    },
    noContas: {
      color: colors.onSurfaceVariant,
    },
    contaItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 6,
    },
    contaNome: {
      flex: 2,
      color: colors.onSurface,
    },
    contaValor: {
      flex: 1,
      textAlign: "right",
      color: colors.onSurface,
    },
    contaData: {
      flex: 1,
      textAlign: "right",
      color: colors.onSurfaceVariant,
    },
    graficosContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      flexWrap: "wrap",
    },
    graficoItem: {
      flex: 1,
      minWidth: 300,
      marginHorizontal: 8,
    },
  });
