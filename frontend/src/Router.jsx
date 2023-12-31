import { Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import ReadingList from "./pages/ReadingList";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import NoMatch from "./pages/NoMatch";
import Connexion from "./pages/Connexion";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useUserContext } from "./contexts/UserContext";

export default function Router() {
  const { user } = useUserContext();
  let isAllowed = false;

  if (user) {
    isAllowed = true;
  }

  return (
    <Routes>
      <Route path="/connexion" element={<Connexion />} />
      <Route element={<ProtectedRoutes isAllowed={isAllowed} />}>
        <Route path="/" element={<Library />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books/:id" element={<Book />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
