import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

// custom hook
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export default useCities;

