import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
