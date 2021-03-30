/* eslint-disable import/dynamic-import-chunkname */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'transactions',
        loadChildren: () =>
            import('./modules/transactions/transactions.module').then(m => m.TransactionsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
