import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues: number[] = [];
    const outcomeValues: number[] = [];

    this.transactions.forEach(trans => {
      if (trans.type === 'income') {
        incomeValues.push(trans.value);
      } else {
        outcomeValues.push(trans.value);
      }
    });

    const income = incomeValues.reduce((acc, val) => acc + val, 0);
    const outcome = outcomeValues.reduce((acc, val) => acc + val, 0);
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
