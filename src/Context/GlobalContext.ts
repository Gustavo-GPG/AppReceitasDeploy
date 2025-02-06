import { createContext } from 'react';
import { GlobalContextType } from '../types';
import InitialValue from './InitialValue';

export const GlobalContext = createContext([InitialValue, () => {}] as GlobalContextType);
