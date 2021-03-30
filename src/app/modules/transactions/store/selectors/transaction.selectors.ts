/* eslint-disable import/group-exports */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../state/transactions.state';
import { selectAll } from '../reducers/transactions.reduers';
import { Transaction } from '../../models/transaction';

const TransactionsState = createFeatureSelector<State>('transactions');

export const allTransactions = createSelector(TransactionsState, selectAll);

export const filteredTransactions = createSelector(allTransactions, (transactions, props) => {
    if (!props) {
        return transactions;
    }

    let result = [...transactions] as Transaction[];

    const { id, dateFrom, dateTo } = props;

    if (id) {
        result = result.filter(r => r.id.toString().includes(id));
    }

    if (dateFrom && dateTo) {
        result = result.filter(r => dateFrom <= new Date(r.date) && new Date(r.date) <= dateTo);
    }

    return result;
});
