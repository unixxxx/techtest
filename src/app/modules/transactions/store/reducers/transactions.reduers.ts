/* eslint-disable default-param-last */
/* eslint-disable import/group-exports */
import { createReducer, on } from '@ngrx/store';
import { initialState, adapter } from '../state/transactions.state';
import * as fromTransactions from '../actions/transactions.actions';

const transactionsReducer = createReducer(
    initialState,
    on(fromTransactions.setTransactions, (state, action) => adapter.setAll(action.transactions, state)),
    on(fromTransactions.createTransaction, (state, action) => adapter.addOne(action.transaction, state))
);

export function reducer(state = initialState, action: fromTransactions.TransactionActions) {
    return transactionsReducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();