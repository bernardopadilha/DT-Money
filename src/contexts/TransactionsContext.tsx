import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axicios";

interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}
interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}

interface TransactionsContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps{
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionsContextType);
//export da tipagem feita para do formulário.

export function TransactionsProvider({children} : TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        })

        setTransactions(response.data)
// função get(pegar): essa função pega os dados do estado e joga em tela, neste caso ele pega as transações.
    }
// o fetch() é uma função que ou ser chamada faz uma requisição http e trás os dados da URL.

    async function createTransaction(data: CreateTransactionInput) {
        const {description, category, price, type} = data

        const response = await api.post('transactions', {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
          })
      
          setTransactions( (state) =>[response.data, ...state]);
    }

    useEffect(() => {
        fetchTransactions()
    }, [])
    
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction,
        }}>
           {children}
        </TransactionsContext.Provider>
    )
}