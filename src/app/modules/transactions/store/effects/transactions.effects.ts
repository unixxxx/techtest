/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { tap, switchMap, withLatestFrom } from 'rxjs/operators';

import { Transaction } from '../../models/transaction';

import {
    createTransaction,
    fetchTransactions,
    setTransactions,
    deleteTransaction,
} from '../actions/transactions.actions';
import { allTransactions } from '../selectors/transaction.selectors';

@Injectable()
export class TransactionEffects {
    createTransaction$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(createTransaction),
                withLatestFrom(this.store.pipe(select(allTransactions))),
                tap(([action, existingTransactions]) => {
                    this.storageService.store(
                        'data',
                        JSON.stringify([...existingTransactions, action.transaction])
                    );
                })
            ),
        { dispatch: false }
    );

    deleteTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTransaction),
            withLatestFrom(this.store.pipe(select(allTransactions))),
            switchMap(([action, existingTransactions]) => {
                const transactions = existingTransactions.filter(t => t.id !== action.id);
                this.storageService.store('data', JSON.stringify(transactions));
                return of(setTransactions({ transactions }));
            })
        )
    );

    fetchTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTransactions),
            switchMap(() => {
                const transactions = JSON.parse(this.storageService.retrieve('data')) as Transaction[];
                return of(setTransactions({ transactions }));
            })
        )
    );

    constructor(
        private actions$: Actions,
        private storageService: LocalStorageService,
        private store: Store
    ) {}
}
