import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function SidebarLayout({ children }) {
  const { sidebar } = useSidebarContext();
  return (
    <div
      className={`${
        sidebar
          ? "overflow-y-auto max-h-screen lg:grid lg:grid-cols-[15rem_auto] lg:h-full"
          : "flex flex-col"
      } bg-alice-blue`}
    >
      {sidebar && <Sidebar />}
      <div className="max-h-screen overflow-y-scroll">{children}</div>
    </div>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
