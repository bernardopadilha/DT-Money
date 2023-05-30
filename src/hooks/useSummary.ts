import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function UseSummary(){
      const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (accumulator, transaction)=> {
      if (transaction.type === 'income') {
        accumulator.income += transaction.price;
        accumulator.total += transaction.price;
      } else {
        accumulator.outcome += transaction.price;
        accumulator.total -= transaction.price;
      }


      return accumulator
    },
    {
      income: 0, 
      outcome: 0, 
      total: 0
    }
  )
// o reduce serve para quando precisarmos reduzir a forma de objetos que tem dentro de um array.
// por exemplo, em nosso estado de transactions temos diversos dados de transações e queremos reduzilo para pegar apenas o 'outcome', o 'income', e o total

    return {
        summary,
    }
}