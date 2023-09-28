import { useState } from "react";
import axios from "axios";
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
          }/volumes?q=${search}&projection=lite&maxResults=30&key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .then((res) => setSearchResult(res.data));
    }
  };

  return (
    <div className="bg-alice-blue flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold text-xanthous my-5">Library</h1>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="text-umber bg-alice-blue px-2 py-0.5 mb-10 border-4 border-umber rounded-md w-10/12 lg:w-[30rem] focus:outline-none"
        onKeyDown={handleSearch}
      />
      {searchResult && (
        <div className="w-full">
          {searchResult?.totalItems ? (
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 px-5">
              {searchResult.items.map((volume) => (
                <VolumeCard key={volume.id} volume={volume} />
              ))}
            </div>
          ) : (
            <p className="text-center">No result matched your research</p>
          )}
        </div>
      )}
    </div>
  );
}
