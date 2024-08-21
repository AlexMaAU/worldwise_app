import { useContext } from "react";
import { UserAuthContext } from "../contexts/UserAuthContext";

function useAuth() {
  const context = useContext(UserAuthContext);

  return context;
}

export default useAuth;

