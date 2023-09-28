import { Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import ReadingList from "./pages/ReadingList";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import NoMatch from "./pages/NoMatch";
import Connexion from "./pages/Connexion";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Library />} />
      <Route path="/reading-list" element={<ReadingList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
