import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Conta } from '@stores/useContasStore';
import {
  useTheme,
  TextInput,
  Button,
  Switch,
  Surface,
  Text,
  Chip,
  HelperText,
} from 'react-native-paper';

type Frequencia = 'único' | 'mensal' | 'anual' | 'semanal';
type Grupo = 'Fixa' | 'Variável' | 'Extra' | 'Lazer' | 'Outros';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (conta: Omit<Conta, 'id'> & { id?: string }) => void;
  contaEdit?: Conta | null;
};

const categorias = ['Alimentação', 'Aluguel', 'Internet', 'Transporte', 'Outros'];
const grupos: Grupo[] = ['Fixa', 'Variável', 'Extra', 'Lazer', 'Outros'];
const frequencias: Frequencia[] = ['único', 'mensal', 'anual', 'semanal'];

export const ModalConta = ({ visible, onClose, onSave, contaEdit }: Props) => {
  const { colors } = useTheme();

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const [grupo, setGrupo] = useState<Grupo>(grupos[0]);
  const [valor, setValor] = useState('');
  const [pago, setPago] = useState(false);
  const [desconto, setDesconto] = useState('');
  const [dataPagamento, setDataPagamento] = useState(new Date());
  const [frequencia, setFrequencia] = useState<Frequencia>('único');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  useEffect(() => {
    if (contaEdit) {
      setNome(contaEdit.nome);
      setCategoria(contaEdit.categoria);
      setGrupo(contaEdit.grupo ?? grupos[0]);
      setValor(contaEdit.valor.toString());
      setPago(contaEdit.pago);
      setDesconto(contaEdit.desconto?.toString() ?? '');
      setDataPagamento(new Date(contaEdit.dataPagamento));
      setFrequencia(contaEdit.frequencia);
    } else {
      setNome('');
      setCategoria(categorias[0]);
      setGrupo(grupos[0]);
      setValor('');
      setPago(false);
      setDesconto('');
      setDataPagamento(new Date());
      setFrequencia('único');
    }
  }, [contaEdit, visible]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataPagamento(selectedDate);
    }
  };

  const validarEEnviar = () => {
    if (!nome.trim()) return alert('Informe o nome da conta.');
    if (!valor || isNaN(Number(valor))) return alert('Informe um valor válido.');
    if (desconto && isNaN(Number(desconto))) return alert('Desconto inválido.');

    onSave({
      id: contaEdit?.id,
      nome: nome.trim(),
      categoria,
      grupo,
      valor: Number(valor),
      pago,
      desconto: desconto ? Number(desconto) : undefined,
      dataPagamento: dataPagamento.toISOString(),
      frequencia,
    });

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Surface style={[styles.container, { backgroundColor: colors.surface }]} elevation={4}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text variant="titleLarge" style={styles.title}>
                {contaEdit ? 'Editar Conta' : 'Nova Conta'}
              </Text>

              <TextInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                mode="outlined"
                style={styles.input}
              />

              <Text style={styles.label}>Categoria</Text>
              <View style={styles.chipsRow}>
                {categorias.map((cat) => (
                  <Chip
                    key={cat}
                    selected={categoria === cat}
                    onPress={() => setCategoria(cat)}
                    style={styles.chip}
                  >
                    {cat}
                  </Chip>
                ))}
              </View>

              <Text style={styles.label}>Grupo</Text>
              <View style={styles.chipsRow}>
                {grupos.map((g) => (
                  <Chip
                    key={g}
                    selected={grupo === g}
                    onPress={() => setGrupo(g)}
                    style={styles.chip}
                  >
                    {g}
                  </Chip>
                ))}
              </View>

              <TextInput
                label="Valor (R$)"
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Desconto (opcional)"
                value={desconto}
                onChangeText={setDesconto}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />

              <View style={styles.switchRow}>
                <Text variant="bodyMedium">Pago</Text>
                <Switch value={pago} onValueChange={setPago} color={colors.primary} />
              </View>

              <Text style={styles.label}>Data de Pagamento</Text>
              <Button
                icon="calendar"
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={{ marginTop: 4 }}
              >
                {dataPagamento.toLocaleDateString()}
              </Button>

              {showDatePicker && (
                <DateTimePicker
                  value={dataPagamento}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Frequência</Text>
              <View style={styles.chipsRow}>
                {frequencias.map((freq) => (
                  <Chip
                    key={freq}
                    selected={frequencia === freq}
                    onPress={() => setFrequencia(freq)}
                    style={styles.chip}
                    icon={frequencia === freq ? 'check-bold' : undefined}
                  >
                    {freq}
                  </Chip>
                ))}
              </View>

              <View style={styles.buttonsRow}>
                <Button
                  mode="outlined"
                  onPress={onClose}
                  style={styles.button}
                  icon="close"
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={validarEEnviar}
                  style={styles.button}
                  icon="content-save"
                >
                  Salvar
                </Button>
              </View>
            </ScrollView>
          </Surface>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    borderRadius: 16,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 16,
    fontWeight: '600',
  },
  input: {
    marginTop: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});
