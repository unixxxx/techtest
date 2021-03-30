/* eslint-disable import/group-exports */
import { createAction, props, union } from '@ngrx/store';
import { Transaction } from '../../models/transaction';

export const fetchTransactions = createAction('[TRANSACTIONS] FETCH');

export const setTransactions = createAction('[TRANSACTIONS] SET', props<{ transactions: Transaction[] }>());

export const createTransaction = createAction('[TRANSACTIONS] CREATE', props<{ transaction: Transaction }>());

export const deleteTransaction = createAction('[TRANSACTIONS] DELETE', props<{ id: number }>());

const actions = union({
    setTransactions,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
});

export type TransactionActions = typeof actions;
