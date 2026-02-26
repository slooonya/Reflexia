import { createContext } from "react";

type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
});