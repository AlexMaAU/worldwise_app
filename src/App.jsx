// 其他不用懒加载的部分都要放在最上面
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityProvider from "./contexts/CityContext";
import UserAuthProvider from "./contexts/UserAuthContext";
import CitiesProvider from "./contexts/CitiesContext";

// 二级路由要放在一级路由上面
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// The bundle and code splitting - 代码拆分和懒加载
// 把一级路由都用lazy函数进行懒加载，顺序尽量和Routes的定义顺序保持一致
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// 如果二级路由也想懒加载，方法也是一样的。一般如果不是大型应用，第一路由懒加载已经足够了。
// const CityList = lazy(() => import('./CityList'));
// const City = lazy(() => import('./City'));
// const CountryList = lazy(() => import('./CountryList'));
// const Form = lazy(() => import('./Form'));

function App() {
  return (
    <UserAuthProvider>
      <CitiesProvider>
        <CityProvider>
          <BrowserRouter>
            {/* 异步加载组件：<Suspense> 通常与 React.lazy() 配合使用，用来懒加载组件。这样只有在需要渲染这些组件时，它们才会被加载，从而减小初始加载的体积 */}
            {/* fallback 属性指定了在子组件加载时显示的内容。这个内容可以是一个简单的 loading spinner、一个占位符，或者任何你想显示的 UI 组件 */}
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                {/* 等同于：<Route index element={<Homepage />} /> */}
                <Route path="/" element={<Homepage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                {/* Nested Routes */}
                <Route path="/app" element={<AppLayout />}>
                  {/* 默认重定向到 /app/cities:
                to：指定重定向的目标路径。
                replace：布尔值。如果为 true，重定向将替换当前历史记录条目；如果为 false 或省略，则会将重定向添加到历史记录中。
            */}
                  <Route index element={<Navigate to="cities" replace />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="/login" element={<Login />} />
                {/* 通用匹配符，放在Routes的最下面，这样如果上面的路由全都没有匹配到，就直接匹配成Page Not Found */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CityProvider>
      </CitiesProvider>
    </UserAuthProvider>
  );
}

export default App;

