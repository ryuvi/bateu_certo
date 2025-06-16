import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { useContas } from "@stores/useContasStore";
import { formatDate, formatValue } from "@constants/Funcs";

import { exportarContasParaCSV } from "@/utils/csv";

export default function ResumoFinanceiro() {
  const contas = useContas();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const totalAPagar = contas.reduce(
    (acc, c) => (c.pago ? acc : acc + c.valor),
    0
  );
  const totalPago = contas.reduce(
    (acc, c) => (c.pago ? acc + c.valor : acc),
    0
  );
  const contasPendentes = contas.filter((c) => !c.pago);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Botão de exportar */}
        <Button
          icon="file-export"
          mode="contained"
          onPress={() => exportarContasParaCSV(contas)}
          style={{ marginTop: 24 }}
        >
          Exportar para CSV
        </Button>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total a Pagar:</Text>
        <Text
          style={{
            ...styles.value,
            color: totalAPagar < totalPago ? colors.error : colors.primary,
          }}
        >
          {formatValue(totalAPagar)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Pago:</Text>
        <Text
          style={{
            ...styles.value,
            color: "#50FA7B",
          }}
        >
          {formatValue(totalPago)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Contas Pendentes:</Text>
        {contasPendentes.length === 0 ? (
          <Text style={styles.noContas}>Nenhuma conta pendente</Text>
        ) : (
          contasPendentes.map((conta) => (
            <View key={conta.id}>
              <View style={styles.contaItem}>
                <Text style={styles.contaNome}>{conta.nome}</Text>
                <View>
                  <Text style={styles.contaValor}>
                    {formatValue(conta.valor)}
                  </Text>
                  <Text style={styles.contaData}>
                    {formatDate(new Date(conta.dataPagamento))}
                  </Text>
                </View>
              </View>
              <Divider
                style={{ backgroundColor: colors.primary, marginVertical: 5 }}
              />
            </View>
          ))
        )}
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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 24,
      color: colors.primary,
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
  });
