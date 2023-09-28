import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [login, setLogin] = useState(false);
  const memoizedUser = useMemo(() => {
    return { user, setUser, login, setLogin };
  }, [user, login]);

  return (
    <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
