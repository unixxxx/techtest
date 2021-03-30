import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';

const routes: Routes = [
    { path: '', component: TransactionsListComponent, pathMatch: 'full' },
    { path: 'new', component: NewTransactionComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TransactionsRoutingModule {}
