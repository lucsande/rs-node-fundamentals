import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionRepo = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepo.all();
    const balance = transactionRepo.getBalance();

    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  try {
    const createTransaction = new CreateTransactionService(transactionRepo);
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
