import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Conta } from '@stores/useContasStore';

export const exportarContasParaCSV = async (contas: Conta[]) => {
  const header = [
    'Nome',
    'Categoria',
    'Grupo',
    'Valor (R$)',
    'Pago',
    'Desconto (R$)',
    'Data de Pagamento',
    'Frequência',
  ];

  const linhas = contas.map((c) => [
    c.nome,
    c.categoria,
    c.grupo,
    c.valor.toFixed(2).replace('.', ','),
    c.pago ? 'Sim' : 'Não',
    c.desconto ? c.desconto.toFixed(2).replace('.', ',') : '',
    new Date(c.dataPagamento).toLocaleDateString(),
    c.frequencia,
  ]);

  const csv = [header, ...linhas].map((linha) => linha.join(';')).join('\n');

  const nomeArquivo = `contas_${new Date().toISOString().slice(0, 10)}.csv`;
  const caminho = `${FileSystem.documentDirectory}${nomeArquivo}`;

  try {
    await FileSystem.writeAsStringAsync(caminho, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(caminho, {
      mimeType: 'text/csv',
      dialogTitle: 'Exportar CSV',
    });
  } catch (e) {
    console.error('Erro ao exportar CSV:', e);
    alert('Erro ao exportar CSV');
  }
};
