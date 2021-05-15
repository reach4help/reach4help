import { Store } from 'react-stores';
import { ProgramModel } from './objectModel/ProgramModel';
export interface IMyStoreState {
  Programs: ProgramModel[];
}

export const myStore = new Store<IMyStoreState>({
  Programs: [] as ProgramModel[], // initial state values
});
