import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-umber text-xanthous font-bold border-r-4 border-cactus">
      <div className="flex flex-col items-center mt-5 mb-3 pb-5 gap-3 border-b-4 border-cactus w-full">
        <button type="button" onClick={() => navigate("/profile")}>
          <FaCircleUser size={150} />
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <h2>Profile</h2>
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        <Link to="/">Library</Link>
        <Link to="/reading-list">Reading List</Link>
      </ul>
    </div>
  );
}
