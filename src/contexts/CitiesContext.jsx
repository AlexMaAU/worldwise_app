import { createContext } from "react";
import { useEffect, useState } from "react";
import data from "../../data/cities.json";

// 对context中定义的state进行更新的操作，setXXXX，都可以移到 useReducer 里，从而进一步优化代码

// 如果你有不同的数据领域，比如用户认证信息、主题设置、语言设置等，最好将它们分成不同的 ContextProvider。这样可以让组件只订阅它们需要的数据，减少不必要的重新渲染。
// 当多个组件需要不同的数据时，将它们分开可以减少每个组件的重新渲染次数。例如，如果你将用户信息和应用主题放在一个 Context 中，更新主题可能会导致与用户信息无关的组件重新渲染。
// 将不同的逻辑放在不同的 Context 中，可以让你的代码更加模块化和易于维护。每个 Context 只关注特定的状态和操作，避免了一个巨大的 Context 承担过多责任。

export const CitiesContext = createContext();

// 这个Context负责所有Cities数据的逻辑
function CitiesProvider({ children }) {
  // 关于Context的优化：如果一个context里的任何一个状态有变化，所有用到这个context的组件都会重新渲染
  // 所以Context定义的时候要注意，尽量做到给每一个global state都单独创建一个context，从而避免由于context引发的大量渲染
  // 所以这里还可以进一步优化
  const [cities, setCities] = useState([]); // 所以这里可以是一个Context
  const [isLoading, setIsLoading] = useState(true); // 另一个Context
  const [mapPosition, setMapPosition] = useState([40, 0]); // 另一个Context

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  function fetchData() {
    setCities(data.cities);
    setIsLoading(false);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;

