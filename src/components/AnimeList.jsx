import { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AnimeCard from "./AnimeCard"; // Agar dono files ek hi folder mein hain

function AnimeList({ anime }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const posterImage = anime.attributes?.posterImage;
  const animeImage = posterImage?.medium || posterImage?.small || "https://placehold.co/150x220?text=No+Image";

  return (
    <div className="h-full relative">
      {/* For skeleton Loaading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 rounded-xl overflow-hidden">
          <Skeleton 
            height="100%" 
            baseColor="#2e1065" 
            highlightColor="#4c1d95" 
            className="h-full w-full"
          />
        </div>
      )}
      <img 
        src={animeImage} 
        alt="" 
        className="hidden" 
        onLoad={() => setIsLoaded(true)} 
      />

      {isLoaded && <AnimeCard anime={anime} />}
    </div>
  );
}

export default AnimeList;