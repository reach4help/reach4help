import { Store } from 'react-stores';
import { Program } from './objectModel/ProgramModel';
export interface IMyStoreState {
  Programs: Program[];
}

export const myStore = new Store<IMyStoreState>({
  Programs: [] as Program[], // initial state values
});
