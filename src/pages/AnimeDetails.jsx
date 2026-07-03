import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { animeDataCache } from './Home'; 
import { addToWatchlist } from '../utils/AddToWatchList'; 

function AnimeDetails() {
  const { id } = useParams();

  const [anime, setAnime] = useState(() => {
    if (animeDataCache) {
      return animeDataCache.find(item => String(item.id) === String(id)) || null;
    }
    return null;
  });

  const [loading, setLoading] = useState(!anime);

  useEffect(() => {
    if (anime) return;

    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
        const resData = await response.json();
        setAnime(resData.data || null);
      } catch (err) {
        console.error("Fetch operation failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id, anime]);

  if (loading) {
    return (
      <div className="bg-purple-950 min-h-screen flex flex-col justify-center items-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-purple-800 border-t-red-500 rounded-full animate-spin"></div>
        <p className="text-purple-300 font-medium tracking-widest text-sm">Loading...</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="bg-purple-950 min-h-screen flex flex-col justify-center items-center gap-4 text-white">
        <h2 className="text-2xl font-bold text-red-500">404 - Anime Not Found</h2>
        <Link to="/" className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors">Go Back Home</Link>
      </div>
    );
  }

  const attr = anime.attributes || {};
  const title = attr.canonicalTitle || "Unknown Title";
  const posterImg = attr.posterImage?.medium || attr.posterImage?.small;
  const coverImg = attr.posterImage?.tiny || posterImg; 
  
  const rating = attr.averageRating ? `${attr.averageRating}%` : "N/A";

  return (
    <div className="bg-purple-950 min-h-screen text-white font-sans">
      
      <div className="relative h-[30vh] md:h-[40vh] w-full overflow-hidden bg-purple-900/30">
        <img 
          src={coverImg} 
          alt="" 
          loading="eager"
          fetchpriority="high"
          className="w-full h-full object-cover object-center opacity-15 blur-sm scale-110" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-purple-950 via-purple-950/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative -mt-24 md:-mt-36 z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          <div className="w-48 sm:w-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-purple-800/60 bg-purple-900/20">
            <img 
              src={posterImg} 
              alt={title} 
              loading="eager"
              fetchpriority="high"
              className="w-full h-auto object-cover" 
            />
          </div>

          <div className="grow flex flex-col gap-4 text-center md:text-left mt-0 md:mt-24">
            
            <span className="inline-block text-xs font-bold tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 w-fit mx-auto md:mx-0 uppercase">
              {attr.status || "Unknown Status"}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {title}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-purple-900/30 backdrop-blur-sm p-4 rounded-xl border border-purple-800/40 mt-2 text-sm max-w-2xl shadow-inner">
              <div className="flex flex-col">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Rating</span>
                <span className="text-md font-semibold text-amber-400">⭐ {rating}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Episodes</span>
                <span className="text-md font-semibold text-white">{attr.episodeCount || "N/A"} eps</span>
              </div>
              <div className="flex flex-col">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Duration</span>
                <span className="text-md font-semibold text-white">{attr.episodeLength || "N/A"} min</span>
              </div>
              <div className="flex flex-col">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Released</span>
                <span className="text-md font-semibold text-white">{attr.startDate ? attr.startDate.split("-")[0] : "N/A"}</span>
              </div>
            </div>

            <div className="mt-4 max-w-3xl">
              <h3 className="text-lg font-bold text-red-500 mb-2 border-b border-purple-800/60 pb-1 w-fit">
                Description
              </h3>
              <p className="text-sm md:text-base text-purple-200/90 leading-relaxed text-justify font-light">
                {attr.synopsis || attr.description || "No description available for this anime."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-4 text-xs text-purple-300/60 font-medium mt-2">
              <span>🛠️ Type: <span className="text-purple-300 capitalize">{attr.showType || "N/A"}</span></span>
              <span>📅 End Date: <span className="text-purple-300">{attr.endDate || "Ongoing"}</span></span>
              
              <button
                type="button"
                onClick={() => addToWatchlist(anime)}
                className="px-4 py-2 bg-linear-to-r from-red-600 to-purple-700 hover:from-red-500 hover:to-purple-600 text-white font-bold rounded-lg border border-red-500/40 shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_16px_rgba(239,68,68,0.4)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5 ml-0 md:ml-2"
              >
                ❤️ Add to Watchlist
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AnimeDetails;