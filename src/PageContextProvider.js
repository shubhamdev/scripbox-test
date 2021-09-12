import React, { useState, createContext } from "react";
export const PageContext = createContext();
const PageContextProvider = (props) => {
  const data = useState("");
  return (
    <PageContext.Provider
      value={{
        user: data,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
