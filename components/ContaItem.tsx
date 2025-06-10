import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Conta } from "@stores/useContasStore";
import {
  Card,
  Text,
  IconButton,
  useTheme,
  Chip,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { formatDate, formatValue } from "@/constants/Funcs";

type Props = {
  conta: Conta;
  onMarcarPago: (id: string) => void;
  onRemover: (id: string) => void;
  onEditar: (conta: Conta) => void;
};

const getIcon = (category: string, props: any, colors: any) => {
  switch (category) {
    case "Internet":
      return <MaterialIcons
              {...props}
              name={"wifi"}
              size={28}
              color={colors.primary}
            />
    case "Energia":
      return <MaterialIcons
              {...props}
              name={"bolt"}
              size={28}
              color={colors.primary}
            />
    case "Aluguel":
      return <MaterialIcons
              {...props}
              name={"house"}
              size={28}
              color={colors.primary}
            />
    case "Água":
      return <MaterialIcons
              {...props}
              name={"water-drop"}
              size={28}
              color={colors.primary}
            />
    default:
      return <MaterialIcons
              {...props}
              name={"insert-drive-file"}
              size={28}
              color={colors.primary}
            />
  }
}

export const ContaItem = ({ conta, onMarcarPago, onRemover, onEditar }: Props) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const isPago = conta.pago;
  const statusColor = isPago ? colors.primary : colors.error;

  const dataFormatada = formatDate(new Date(conta.dataPagamento));

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card
        mode="elevated"
        style={[styles.card, { backgroundColor: colors.surfaceVariant }]}
        onPress={() => onEditar(conta)}
      >
        <Card.Title
          title={conta.nome}
          titleStyle={styles.title}
          subtitle={`Data: ${dataFormatada}`}
          left={(props) => getIcon(conta.categoria, props, colors)}
        />

        <Card.Content>
          <Text variant="bodyMedium" style={styles.valor}>
            Valor: <Text style={{ fontWeight: "bold" }}>{formatValue(conta.valor)}</Text>
          </Text>

          {!!conta.desconto && (
            <Text variant="bodySmall" style={styles.desconto}>
              Desconto: {formatValue(conta.desconto)}
            </Text>
          )}

          <Chip
            icon={isPago ? "check-circle" : "clock-outline"}
            style={{
              marginTop: 8,
              backgroundColor: isPago ? colors.primaryContainer : colors.secondaryContainer,
              alignSelf: "flex-start",
            }}
            textStyle={{ color: statusColor }}
          >
            {isPago ? "Pago" : "Pendente"}
          </Chip>
        </Card.Content>

        <Divider style={{ marginVertical: 8 }} />

        <Card.Actions style={styles.actions}>
          {!isPago && (
            <IconButton
              icon="check"
              iconColor={colors.primary}
              size={24}
              onPress={() => onMarcarPago(conta.id)}
            />
          )}
          <IconButton
            icon="delete"
            iconColor={colors.error}
            size={24}
            onPress={() => onRemover(conta.id)}
          />
          <IconButton
            icon="pencil"
            iconColor={colors.outline}
            size={24}
            onPress={() => onEditar(conta)}
          />
        </Card.Actions>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  valor: {
    marginTop: 4,
  },
  desconto: {
    marginTop: 2,
    color: "#888",
  },
  actions: {
    justifyContent: "flex-end",
    paddingRight: 8,
  },
});
