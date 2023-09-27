import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const SidebarContext = createContext();
export const useSidebarContext = () => useContext(SidebarContext);

export function SidebarContextProvider({ children }) {
  const [sidebar, setSidebar] = useState(true);
  const memoizedSidebar = useMemo(() => {
    return { sidebar, setSidebar };
  }, [sidebar]);

  return (
    <SidebarContext.Provider value={memoizedSidebar}>
      {children}
    </SidebarContext.Provider>
  );
}

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
