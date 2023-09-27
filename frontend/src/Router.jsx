import { Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import ReadingList from "./pages/ReadingList";
import Profile from "./pages/Profile";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Library />} />
      <Route path="/reading-list" element={<ReadingList />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
