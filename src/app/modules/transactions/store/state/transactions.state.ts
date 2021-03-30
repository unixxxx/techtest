/* eslint-disable import/group-exports */
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Transaction } from '../../models/transaction';

export interface State extends EntityState<Transaction> {}

export const adapter = createEntityAdapter<Transaction>({ selectId: t => t.id });

export const initialState: State = adapter.getInitialState();
