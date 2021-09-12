import React, { Suspense, createContext } from "react";
import "./App.css";
import PageContextProvider from "./PageContextProvider";
const Routers = React.lazy(() => import("./config/Routers"));
export const PageContext = createContext();

function App() {
  return (
    <Suspense fallback="Loading">
      <PageContextProvider>
        <Routers />
      </PageContextProvider>
    </Suspense>
  );
}

export default App;
