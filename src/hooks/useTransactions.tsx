import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { api } from '../services/api';

interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

// interface TransactionsInput {
//   title: string,
//   amount: number,
//   type: string,
//   category: string,
// }

//herda todos os campos da interface Transaction, menos o id e o createdAt, pois eles estão sendo omitidos
type TransactionsInput = Omit<Transaction, 'id' | 'createdAt'>

// outra forma que é o inverso do omit, vai pegar apenas os campos informados
// type TransactionsInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionsInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //enganando o TS, para dizer que o obj tem o formato correto, pois passar apenas o obj dá erro de tipagem
); //criando context e passando o valor inicial

//criando provider para que qualquer component da aplicação possa ter acesso as informações desse contexto com o valor/estado atual do context
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionsInput) {
    const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() })
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]) //conceito de imutabilidade
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>{/* valur retorna um objeto com a transação e a função*/}
      {/* recebe um conteúdo/children */}
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}