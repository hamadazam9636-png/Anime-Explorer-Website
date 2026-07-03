import { useState } from "react"; 
import { Link } from "react-router-dom";
import AnimeList from "../components/AnimeList";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedItems = localStorage.getItem("watchlist");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (err) {
      console.error("Failed to parse watchlist:", err);
      return [];
    }
  });

  const handleRemove = (id) => {
    const updatedList = watchlist.filter(item => item.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="bg-purple-950 min-h-screen text-white px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black tracking-wide border-l-4 border-red-500 pl-3 mb-8">
          My Watchlist 🍿
        </h2>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <p className="text-purple-300 text-lg">Your watchlist is empty. Add some anime legends!</p>
            <Link to="/" className="px-6 py-2 bg-red-600 hover:bg-red-500 font-bold rounded-lg transition-all shadow-md">
              Discover Anime
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((anime) => (
              <div key={anime.id} className="relative group">
                <button 
                  onClick={() => handleRemove(anime.id)}
                  className="absolute top-2 left-2 bg-red-600/90 text-white p-1.5 rounded-md text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-500 cursor-pointer shadow-md"
                >
                  ✕ Remove
                </button>
                <AnimeList anime={anime} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;