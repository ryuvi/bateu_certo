import { Conta } from '@/stores/useContasStore'

export const contas: Conta[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  nome: `Conta ${i + 1}`,
  categoria: i % 4 === 0 ? 'Aluguel' :
             i % 4 === 1 ? 'Energia' :
             i % 4 === 2 ? 'Internet' : 'Cartão de Crédito',
  grupo: i % 5 === 0 ? 'Fixa' :
         i % 5 === 1 ? 'Variável' :
         i % 5 === 2 ? 'Extra' :
         i % 5 === 3 ? 'Lazer' : 'Outros',
  valor: 100 + (i * 5),
  pago: i % 3 === 0,
  desconto: i % 5 === 0 ? 10 : 0,
  dataPagamento: `2023-08-${(i % 30 + 1).toString().padStart(2, '0')}`,
  frequencia: i % 4 === 0 ? 'mensal' :
              i % 4 === 1 ? 'único' :
              i % 4 === 2 ? 'semanal' : 'anual',
}))
