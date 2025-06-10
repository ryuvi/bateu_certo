import React, { useState } from "react"
import { FlatList, Text, View } from "react-native"
import { useContasStore, Conta } from "@stores/useContasStore"
import { ContaItem } from "@components/ContaItem"
import { ModalConta } from "@components/ModalConta"
import uuid from "react-native-uuid"
import { useTheme, Button, Surface } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"

export default function ListaContasScreen() {
  const contas = useContasStore((state) => state.contas)
  const adicionar = useContasStore((state) => state.adicionar)
  const atualizar = useContasStore((state) => state.atualizar)
  const marcarPago = useContasStore((state) => state.marcarPago)
  const remover = useContasStore((state) => state.remover)

  const { colors } = useTheme()
  const styles = getStyles(colors)

  const [modalVisible, setModalVisible] = useState(false)
  const [contaEdit, setContaEdit] = useState<Conta | null>(null)

  function abrirModalNovaConta() {
    setContaEdit(null)
    setModalVisible(true)
  }

  function abrirModalEditar(conta: Conta) {
    setContaEdit(conta)
    setModalVisible(true)
  }

  function salvarConta(conta: Omit<Conta, "id"> & { id?: string }) {
    if (conta.id) {
      atualizar(conta.id, conta)
    } else {
      adicionar({ ...conta, id: uuid.v4() as string })
    }
  }

  const renderItem = ({ item }: { item: Conta }) => (
    <ContaItem
      conta={item}
      onMarcarPago={marcarPago}
      onRemover={remover}
      onEditar={abrirModalEditar}
    />
  )

  return (
    <Surface style={styles.container}>
      <Button
        mode="contained"
        icon={() => <MaterialIcons name="add" size={20} color={colors.onPrimary} />}
        onPress={abrirModalNovaConta}
        style={styles.novaContaBtn}
        contentStyle={styles.novaContaBtnContent}
        buttonColor={colors.primary}
        textColor={colors.onPrimary}
      >
        Nova Conta
      </Button>

      {contas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma conta cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={contas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      <ModalConta
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={salvarConta}
        contaEdit={contaEdit}
      />
    </Surface>
  )
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    novaContaBtn: {
      marginBottom: 16,
    },
    novaContaBtnContent: {
      flexDirection: "row-reverse",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      color: colors.onBackground,
    },
    flatListContent: {
      paddingBottom: 20,
    },
  })
