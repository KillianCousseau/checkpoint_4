import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo_tsundoku.svg";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function Navbar() {
  const { sidebar, setSidebar } = useSidebarContext();

  return (
    <nav className="h-[10vh] flex items-center bg-umber text-cactus border-b-4 border-cactus">
      <div className="flex gap-3">
        <button
          type="button"
          className="ml-5 mr-3"
          onClick={() => setSidebar(!sidebar)}
        >
          <GiHamburgerMenu size={50} />
        </button>
        <Link to="/">
          <img src={logo} alt="logo" className="w-30 h-20" />
        </Link>
      </div>
    </nav>
  );
}
