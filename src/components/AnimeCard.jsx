import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AnimeCard({ anime }) {
  const navigate = useNavigate();
  const title = anime.attributes?.canonicalTitle || "Unknown Anime";
  const poster = anime.attributes?.posterImage?.medium || "https://placehold.co/400x600/3b0764/ffffff?text=No+Poster";
  const rating = anime.attributes?.averageRating ? (Number(anime.attributes.averageRating) / 10).toFixed(1) : "N/A";

  const [isAdded, setIsAdded] = useState(() => {
    try {
      const currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      return currentWatchlist.some(item => item.id === anime.id);
    } catch {
      return false;
    }
  });

  const handleHeartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    try {
      let currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const isAlreadyAdded = currentWatchlist.some(item => item.id === anime.id);

      if (!isAlreadyAdded) {
        currentWatchlist.push(anime);
        localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));
        setIsAdded(true);
        alert(`🎉 Excellent choice! "${title}" has been added to your Watchlist.`);
      } else {
        currentWatchlist = currentWatchlist.filter(item => item.id !== anime.id);
        localStorage.setItem("watchlist", JSON.stringify(currentWatchlist));
        setIsAdded(false);
        alert(`💔 "${title}" has been removed from your Watchlist.`);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/anime/${anime.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="flex flex-col h-full bg-[#240a34]/40 backdrop-blur-sm group rounded-xl overflow-hidden border border-purple-900/40 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 relative cursor-pointer"
    >
      
      <div className="relative aspect-2/3 overflow-hidden bg-purple-900/20">
        <img 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={title} 
          src={poster} 
        />
        
        {rating !== "N/A" && (
          <span className="absolute top-2 right-2 bg-[#2d2a2a]/90 backdrop-blur-sm text-red-400 text-xs font-black px-2.5 py-1 rounded-md border border-purple-800/40 shadow-md flex items-center gap-1">
            ⭐ <span className="text-white font-extrabold">{rating}</span>
          </span>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-purple-950 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col grow p-4 gap-4">
        
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-bold text-base md:text-md text-white group-hover:text-red-400 line-clamp-1 transition-colors duration-200 flex-1">
            {title}
          </h3>
          
          <button
            type="button"
            onClick={handleHeartClick}
            className="text-lg focus:outline-none transform active:scale-125 hover:scale-110 transition-all cursor-pointer duration-200 select-none z-20"
            title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {isAdded ? "❤️" : "🤍"}
          </button>
        </div>
        
        <div className="w-full text-center mt-auto py-2.5 bg-purple-900/40 text-purple-200 font-bold text-xs rounded-lg border border-purple-800/50 transition-all duration-300 ease-out group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:to-purple-700 group-hover:text-white group-hover:border-red-500 group-hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)] group-hover:-translate-y-0.5 active:translate-y-0">
          View Details
        </div>
      </div>

    </div>
  );
}

export default AnimeCard;