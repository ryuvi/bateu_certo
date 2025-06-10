import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { contas } from '@constants/ContasFake'
import { useActionState } from 'react'

// Tipo de uma conta
export type Conta = {
  id: string
  nome: string
  categoria: string
  valor: number
  pago: boolean
  desconto?: number
  dataPagamento: string // ISO format
  frequencia: 'único' | 'mensal' | 'anual' | 'semanal'
}

// Estado principal da store (formato JSON)
type ContasState = {
  contas: Conta[]
  adicionar: (conta: Conta) => void
  remover: (id: string) => void
  atualizar: (id: string, dados: Partial<Conta>) => void
  marcarPago: (id: string) => void
  limpar: () => void
}

export const useContasStore = create<ContasState>()(
  persist(
    (set, get) => ({
      contas: contas,

      adicionar: (conta) =>
        set((state) => ({
          contas: [...state.contas, conta],
        })),

      remover: (id) =>
        set((state) => ({
          contas: state.contas.filter((conta) => conta.id !== id),
        })),

      atualizar: (id, dados) =>
        set((state) => ({
          contas: state.contas.map((conta) =>
            conta.id === id ? { ...conta, ...dados } : conta
          ),
        })),

      marcarPago: (id) =>
        set((state) => ({
          contas: state.contas.map((conta) =>
            conta.id === id ? { ...conta, pago: true } : conta
          ),
        })),

      limpar: () => set({ contas: [] }),
    }),
    {
      name: 'contas-a-pagar',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export const useContas = () => useContasStore((state) => state.contas)
export const useMarcarPago = () => useContasStore((state) => state.marcarPago)
export const useRemoverConta = () => useContasStore((state) => state.remover)
export const useCategorias = () => useContasStore(state => [...new Set(state.contas.map(item => item.categoria))])