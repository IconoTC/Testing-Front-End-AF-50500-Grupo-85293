import React from 'react'
import { AppContext } from './contest'
import type { AppContextType } from './contest'
import { useLogged } from '../../pages/user/hooks/use-logged';

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {


    const context: AppContextType = {
      user: useLogged(),
      theme: 'light',
      language: 'en',
    };

  return (
    <AppContext.Provider value={context}>{children}</AppContext.Provider>
  )
}

