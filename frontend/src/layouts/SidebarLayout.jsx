import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function SidebarLayout({ children }) {
  const { sidebar } = useSidebarContext();
  return (
    <div
      className={`${
        sidebar ? "grid grid-cols-[15rem_auto]" : "flex flex-col"
      } h-full`}
    >
      {sidebar && <Sidebar />}
      {children}
    </div>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
