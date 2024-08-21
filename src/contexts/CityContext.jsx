import { createContext, useState } from "react";
import useCities from "../utils/useCities";
import SpinnerFullPage from "../components/SpinnerFullPage";

export const CityContext = createContext();

// 这个Context负责当前City数据的逻辑
function CityProvider({ children }) {
  const { cities, isLoading } = useCities();
  // 关于Context的优化：如果一个context里的任何一个状态有变化，所有用到这个context的组件都会重新渲染
  // 所以Context定义的时候要注意，尽量做到给每一个global state都单独创建一个context，从而避免由于context引发的大量渲染
  // 所以这里还可以进一步优化
  const [currentCity, setCurrentCity] = useState({}); // 所以这里可以是一个Context
  const [currentCityIsLoading, setCurrentCityIsLoading] = useState(true); // 另一个Context

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  function getCity(id) {
    const city = cities.find((city) => city.id === id);
    setCurrentCity(city);
    setCurrentCityIsLoading(false);
  }

  return (
    <CityContext.Provider
      value={{
        currentCity,
        setCurrentCity,
        getCity,
        currentCityIsLoading,
        setCurrentCityIsLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export default CityProvider;

