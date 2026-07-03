import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { addToWatchlist } from "../utils/AddToWatchList";

function UpcomingAnime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  
  // Infinite scroll ke liye reference target
  const observer = useRef();
  const lastAnimeElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + 20);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Data Fetching Function
  useEffect(() => {
    const fetchUpcomingAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=startDate&page[limit]=20&page[offset]=${offset}`
        );
        const resData = await response.json();
        
        setAnimeList(prev => [...prev, ...(resData.data || [])]);
        
        // Agar aane wala data 20 se kam hai, toh iska matlab mazeed data khatam ho chuka hai
        if (!resData.data || resData.data.length < 20) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching upcoming anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAnime();
  }, [offset]);

  // Skeleton Card Item (Lights Animation)
  const SkeletonCard = () => (
    <div className="flex flex-col h-full bg-[#240a34]/20 rounded-xl overflow-hidden border border-purple-900/30 animate-pulse">
      <div className="relative aspect-2/3 bg-purple-900/30 flex items-end p-3">
        <div className="h-6 w-full bg-purple-800/50 rounded-md" />
      </div>
      <div className="flex flex-col p-4 gap-4 grow justify-between">
        <div className="flex justify-between items-start gap-2">
          <div className="h-4 bg-purple-800/60 rounded w-3/4" />
          <div className="h-5 bg-purple-800/60 rounded-full w-5" />
        </div>
        <div className="w-full h-8 bg-purple-800/40 rounded-lg mt-auto" />
      </div>
    </div>
  );

  return (
    <div className="bg-purple-950 min-h-screen text-white font-sans px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADING SECTION */}
        <div className="mb-10 border-b border-purple-900/60 pb-4">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            📅 <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-purple-400">Upcoming & Countdown</span> Anime
          </h1>
          <p className="text-sm text-purple-300/80 mt-2">Get ready for the most anticipated anime releases!</p>
        </div>

        {/* ANIME GRID */}
        {animeList.length === 0 && !loading ? (
          <p className="text-center text-purple-300">No upcoming anime found at the moment.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {animeList.map((anime, index) => {
              const attr = anime.attributes || {};
              const title = attr.canonicalTitle || "Unknown Anime";
              const poster = attr.posterImage?.medium || "https://placehold.co/400x600/3b0764/ffffff?text=No+Poster";
              
              const releaseDate = attr.startDate 
                ? new Date(attr.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : "TBA (To Be Announced)";

              const isLastElement = animeList.length === index + 1;

              return (
                <div 
                  key={`${anime.id}-${index}`}
                  ref={isLastElement ? lastAnimeElementRef : null}
                  onClick={() => navigate(`/anime/${anime.id}`)}
                  className="flex flex-col h-full bg-[#240a34]/40 backdrop-blur-sm group rounded-xl overflow-hidden border border-purple-900/40 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 relative cursor-pointer"
                >
                  {/* POSTER IMAGE */}
                  <div className="relative aspect-2/3 overflow-hidden bg-purple-900/20">
                    <img 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={title} 
                      src={poster} 
                    />
                    
                    {/* LAUNCH DATE BADGE */}
                    <span className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md text-center text-red-400 text-[11px] font-bold py-1.5 px-2 rounded-md border border-purple-500/30 shadow-md">
                      🚀 {releaseDate}
                    </span>
                  </div>

                  {/* DETAILS CONTENT */}
                  <div className="flex flex-col grow p-4 gap-3 justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-sm md:text-base text-white group-hover:text-red-400 transition-colors duration-200 flex-1 wrap-break-words whitespace-normal leading-tight line-clamp-2">
                        {title}
                      </h3>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToWatchlist(anime);
                        }}
                        className="text-base focus:outline-none transform active:scale-125 hover:scale-110 transition-all cursor-pointer duration-200 select-none z-20 pt-0.5"
                        title="Add to Watchlist"
                      >
                        🤍
                      </button>
                    </div>
                    
                    <div className="w-full text-center mt-auto py-2 bg-purple-900/40 text-purple-200 font-bold text-xs rounded-lg border border-purple-800/50 transition-all duration-300 ease-out group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:to-purple-700 group-hover:text-white group-hover:border-red-500 group-hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)]">
                      View Details
                    </div>
                  </div>
                </div>
              );
            })}

            {/* SKELETON CARDS GENERATOR */}
            {loading && 
              Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            }
          </div>
        )}

        {/* END OF LIST NOTIFICATION */}
        {!hasMore && animeList.length > 0 && (
          <p className="text-center text-xs text-purple-400/60 mt-12 tracking-wider font-medium uppercase">
            ✨ You have reached the end of upcoming releases
          </p>
        )}

      </div>
    </div>
  );
}

export default UpcomingAnime;