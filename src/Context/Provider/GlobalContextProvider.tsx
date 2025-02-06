import { ReactNode, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import InitialValue from '../InitialValue';

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState(InitialValue);

  return (
    <GlobalContext.Provider
      value={ [layout, setLayout] }
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
