import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";

function useCity() {
  const context = useContext(CityContext);
  return context;
}

export default useCity;

