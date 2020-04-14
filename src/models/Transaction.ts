import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = Math.abs(value); // value should always be a natural number, type('income'|'outcome') is what defines if it is positive or negative operation
    this.type = type;
  }
}

export default Transaction;
