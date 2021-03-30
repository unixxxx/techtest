import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconDefinition } from '@ant-design/icons-angular';
import { StoreModule } from '@ngrx/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline } from '@ant-design/icons-angular/icons';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';

import { reducer } from './store/reducers/transactions.reduers';
import { TransactionEffects } from './store/effects/transactions.effects';
import { EffectsModule } from '@ngrx/effects';

import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

const icons: IconDefinition[] = [DeleteOutline];

@NgModule({
    declarations: [TransactionsListComponent, NewTransactionComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzSwitchModule,
        NzButtonModule,
        NzTableModule,
        NzDropDownModule,
        NzDatePickerModule,
        NzIconModule.forChild(icons),
        TransactionsRoutingModule,
        StoreModule.forFeature('transactions', reducer),
        EffectsModule.forFeature([TransactionEffects]),
    ],
})
export class TransactionsModule {}
