import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useUserContext } from "../contexts/UserContext";
import expressAPI from "../services/expressAPI";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function Sidebar() {
  const { login, setLogin, user, setUser } = useUserContext();
  const { sidebar } = useSidebarContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLogin(true);
    } else {
      navigate("/connexion");
    }
  }, [user]);

  const handleLogOut = () => {
    expressAPI.get("/auth/logout").then((res) => {
      if (res.status === 200) {
        setLogin(false);
        setUser(null);
        localStorage.clear();
        navigate("/connexion");
      }
    });
  };
  return (
    <div
      className={`${
        sidebar && "absolute h-full w-[15rem] lg:relative border-cactus"
      } 
           max-h-screen flex flex-col items-center justify-between bg-umber text-xanthous font-bold border-r-4 border-cactus"
      `}
    >
      {login ? (
        <>
          <div className="w-full flex flex-col items-center">
            <div className="bg-cactus text-umber flex flex-col items-center pt-5 pb-5 gap-3 border-b-4 border-cactus w-full">
              {user.profileImage ? (
                <button type="button" onClick={() => navigate("/profile")}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                      user.profileImage
                    }`}
                    alt="profileImage"
                    className="rounded-full w-40 h-40"
                  />
                </button>
              ) : (
                <button type="button" onClick={() => navigate("/profile")}>
                  <FaCircleUser size={150} />
                </button>
              )}
              <button type="button" onClick={() => navigate("/profile")}>
                <h2 className="text-2xl">{user.username}</h2>
              </button>
            </div>
            <ul className="flex flex-col gap-2 mt-3">
              <Link to="/">Library</Link>
              <Link to="/reading-list">Reading List</Link>
            </ul>
          </div>
          <button type="button" className="pb-5" onClick={handleLogOut}>
            Log Out
          </button>
        </>
      ) : (
        <Link to="/connexion" className="mt-3">
          Connexion
        </Link>
      )}
    </div>
  );
}
