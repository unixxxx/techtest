/* eslint-disable no-console */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { validateMetadataSize } from '../../helpers/metadata-validator';
import { createTransaction } from '../../store/actions/transactions.actions';

@Component({
    selector: 'app-new-transaction',
    templateUrl: './new-transaction.component.html',
    styleUrls: ['./new-transaction.component.less'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {
    private subs = new SubSink();
    form: FormGroup;

    currencies: Array<{ label: string; value: string }> = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
    ];

    destinations: Array<{ label: string; value: string }> = [
        { value: 'Destination 1', label: 'Destination 1' },
        { value: 'Destination 2', label: 'Destination 2' },
    ];

    accounts: Array<{ label: string; value: string }> = [
        { value: 'Account 1', label: 'Account 1' },
        { value: 'Account 2', label: 'Account 2' },
    ];

    constructor(private store: Store, private router: Router) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            internalAccountToDebit: new FormControl('Account 1', [Validators.required]),
            amount: new FormControl(1, [Validators.required, Validators.min(1)]),
            currency: new FormControl('USD', [Validators.required]),
            feePaidByReceiver: new FormControl(false),
            destination: new FormControl('Destination 1', [Validators.required]),
            metadata: new FormArray([], validateMetadataSize),
        });
        this.addMetadata();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    addMetadata() {
        const meta = new FormGroup({
            key: new FormControl('', [Validators.required]),
            value: new FormControl('', [Validators.required]),
        });
        this.subs.sink = meta.valueChanges
            .pipe(
                filter(() => meta.valid),
                first()
            )
            .subscribe(() => this.addMetadata());
        this.metadata.push(meta);
    }

    submitForm() {
        if (this.form.valid) {
            this.store.dispatch(
                createTransaction({ transaction: { ...this.form.value, id: Date.now(), date: new Date() } })
            );
            this.router.navigateByUrl('/transactions');
        }
    }

    removeMetadata(index: number): void {
        if (this.canDeleteMeta) {
            this.metadata.removeAt(index);
        }
    }

    clearForm(event) {
        event.preventDefault();
        this.form.reset();
    }

    get canDeleteMeta() {
        return this.metadata.length > 1;
    }

    get metadata() {
        return this.form.get('metadata') as FormArray;
    }
}
