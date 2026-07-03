export const addToWatchlist = (anime) => {
  try {
    const currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isAlreadyAdded = currentWatchlist.some(item => item.id === anime.id);
    
    if (!isAlreadyAdded) {
      const updatedWatchlist = [...currentWatchlist, anime];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${anime.attributes?.canonicalTitle || "Anime"} added to Watchlist! 🍿`);
    } else {
      alert("This anime is already in your Watchlist! 🦊");
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error);
  }
};