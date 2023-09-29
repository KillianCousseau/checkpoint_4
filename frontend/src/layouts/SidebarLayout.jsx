import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function SidebarLayout({ children }) {
  const { sidebar } = useSidebarContext();
  return (
    <div
      className={`${
        sidebar
          ? "overflow-y-auto h-[90vh] lg:grid lg:grid-cols-[15rem_auto] lg:h-full"
          : "flex flex-col"
      } bg-alice-blue`}
    >
      {sidebar && <Sidebar />}
      <div className="h-[90vh] overflow-y-scroll">{children}</div>
    </div>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
