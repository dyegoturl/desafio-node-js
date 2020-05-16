import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const types = ['income', 'outcome'];

    if (!types.includes(type)) {
      throw new Error('Olha seu tipo aí que está errado, blz?');
    }

    if (value > balance.total && type === 'outcome') {
      throw new Error('Tá duro maluco, dá não!');
    }

    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
