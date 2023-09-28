import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function SidebarLayout({ children }) {
  const { sidebar } = useSidebarContext();
  return (
    <div
      className={`${
        sidebar ? "grid grid-cols-[15rem_auto] h-full" : "flex flex-col"
      } bg-alice-blue`}
    >
      {sidebar && <Sidebar />}
      {children}
    </div>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
