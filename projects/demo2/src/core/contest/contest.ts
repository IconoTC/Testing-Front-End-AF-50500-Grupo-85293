import { createContext } from "react";
import type { UseLogged } from "../../pages/user/hooks/use-logged";

type Theme = 'light' | 'dark';
type Language = 'en' | 'es' | 'fr';


export type AppContextType = {
  user: UseLogged;
  theme: Theme;
  language: Language;
};


const initialContext: AppContextType = {
  user: {} as UseLogged,
  theme: 'light',
  language: 'en',
};

export const AppContext = createContext<AppContextType>(initialContext);
