import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import AnimeList from "../components/AnimeList";
import HerrorBanner from "../components/HerroBanner";

export let animeDataCache = null;

function Home() {
  const { query } = useParams(); 

  const [animeList, setAnimeList] = useState(() => {
    if (!query && animeDataCache) return animeDataCache;
    return [];
  });

  const [loading, setLoading] = useState(() => {
    if (!query && animeDataCache) return false; 
    return true; 
  });

  useEffect(() => {
    if (!query && animeDataCache) {
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const targetQuery = query ? query : "dragon ball"; 
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(targetQuery)}`);
        const resData = await response.json();
        
        if (!isMounted) return;

        const fetchedData = resData.data || [];
        
        if (!query) {
          animeDataCache = fetchedData;
        }
        
        setAnimeList(fetchedData);
      } catch (err) {
        console.error("Fetch operation failed:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query]); 

  const displayList = (!query && animeDataCache) ? animeDataCache : animeList;
  const isCurrentlyLoading = (!query && animeDataCache) ? false : loading;

  return (
    <div>
      {!query && <HerrorBanner />}
      
      <div className="bg-purple-950 min-h-screen text-white px-4 py-8 md:px-8">
        
        <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-wide border-l-4 border-red-500 pl-3">
              {query ? "Search Results" : "Recommended Anime"}
            </h2>
            <p className="text-purple-300/80 text-sm mt-1">
              {query ? `Showing results for "${query}"` : "Based on your favorite search results"}
            </p>
          </div>
        </div>

        {isCurrentlyLoading ? (
          <div className="flex flex-col justify-center items-center h-[40vh] gap-4">
            <div className="w-12 h-12 border-4 border-purple-800 border-t-red-500 rounded-full animate-spin"></div>
            <p className="text-purple-300 font-medium tracking-widest text-sm animate-pulse">Fetching Data...</p>
          </div>
        ) : displayList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-400 text-lg">No anime found for "{query}". Try another name!</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayList.map((anime) => (
              <AnimeList key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;