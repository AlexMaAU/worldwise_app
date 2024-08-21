import { createContext, useState } from "react";

export const UserAuthContext = createContext();

function UserAuthProvider({ children }) {
  const [isLogin, setIslogin] = useState(false);

  return (
    <UserAuthContext.Provider value={{ isLogin, setIslogin }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export default UserAuthProvider;

