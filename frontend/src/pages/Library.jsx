import { useState } from "react";
import axios from "axios";
import SidebarLayout from "../layouts/SidebarLayout";
import VolumeCard from "../components/VolumeCard";

export default function Library() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          `${
            import.meta.env.VITE_GOOGLE_BOOKS_URL
          }/volumes?q=${search}&projection=lite&key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .then((res) => setSearchResult(res.data));
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col items-center">
        <h1 className="font-bold my-5">Library</h1>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-alice-blue px-2 py-0.5 border-4 border-umber rounded-md w-[30rem] focus:outline-none"
          onKeyDown={handleSearch}
        />
        {searchResult
          ? searchResult.items.map((volume) => <VolumeCard key={volume.id} />)
          : null}
      </div>
    </SidebarLayout>
  );
}
