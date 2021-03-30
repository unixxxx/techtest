/* eslint-disable no-console */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Transaction } from '../../models/transaction';
import { fetchTransactions, deleteTransaction } from '../../store/actions/transactions.actions';
import { filteredTransactions } from '../../store/selectors/transaction.selectors';

@Component({
    selector: 'app-transactions-list',
    templateUrl: './transactions-list.component.html',
    styleUrls: ['./transactions-list.component.less'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
    subs = new SubSink();
    transactions$: Observable<Transaction[]>;
    idSearchSubject = new BehaviorSubject('');
    idSearchObservable = this.idSearchSubject.asObservable();

    datesFilter: [Date, Date] = [null, null];
    idFilter = '';

    idSearchVisible = false;
    dateSearchVisible = false;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(fetchTransactions());
        this.subs.sink = this.idSearchObservable
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(
                    id =>
                        (this.transactions$ = this.store.pipe(
                            select(filteredTransactions, {
                                id,
                                dateFrom: this.datesFilter[0],
                                dateTo: this.datesFilter[1],
                            })
                        ))
                )
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    removeTransaction(id: number): void {
        this.store.dispatch(deleteTransaction({ id }));
    }

    onIdFilter() {
        this.idSearchSubject.next(this.idFilter);
    }

    onDatesFilter() {
        const [dateFrom, dateTo] = this.datesFilter;
        this.transactions$ = this.store.pipe(
            select(filteredTransactions, { id: this.idFilter, dateFrom, dateTo })
        );
    }
}
