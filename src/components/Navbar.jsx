import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { query } = useParams();

  const [navInput, setNavInput] = useState(query || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navInput.trim()) {
      navigate(`/Search/${navInput.trim()}`);
      setIsOpen(false);
    } else {
      navigate("/");
      setIsOpen(false);
    }
  };
  const handleResetSearch = (e) => {
    e.preventDefault(); 
    setNavInput("");    
    setIsOpen(false);  
    navigate("/");     
  };

  return (
    <div className="bg-purple-900/90 backdrop-blur-md text-white sticky top-0 z-50 shadow-lg px-6 py-4 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            onClick={handleResetSearch}
            className="text-2xl font-black tracking-wider text-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)] hover:scale-105 transition-transform duration-200"
          >
            命ɪᴛᴀᴄʜɪ𓄿
          </Link>
          
          <div className="hidden md:flex gap-6 items-center font-medium text-lg">
            <Link 
              to="/" 
              onClick={handleResetSearch}
              className="text-purple-200 hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300 py-1"
            >
              Home
            </Link>
            <Link 
              to="/upcoming" 
              className="text-purple-200 hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300 py-1"
            >
              Upcoming
            </Link>
            <Link 
              to="/watchlist" 
              className="text-purple-200 hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300 py-1"
            >
              Watchlist
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="hidden sm:block relative group">
            <input
                key={query || "nav-desktop"} 
                type="text"
                value={navInput} 
                onChange={(e) => setNavInput(e.target.value)}
                placeholder="Search anime..."
                className="px-4 py-1.5 w-64 bg-purple-950/50 text-white rounded-full border border-purple-700/50 outline-none focus:border-red-500 focus:w-80 focus:bg-purple-950 text-base transition-all duration-300 shadow-inner"
            />
          <button type="submit" className="absolute right-3 top-2 text-purple-400 group-focus-within:text-red-500 transition-colors text-sm bg-transparent border-none cursor-pointer">
            🔍
            </button>
          </form>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden block text-2xl p-1 focus:outline-none text-purple-200 hover:text-white transition-colors"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 max-h-0 ${isOpen ? "max-h-64 mt-4 border-t border-purple-800/50 pt-4" : ""}`}>
        <div className="flex flex-col gap-4 font-medium">
          <form onSubmit={handleSearchSubmit} className="relative sm:hidden block w-full">
         <input
          key={query || "nav-mobile"} 
          type="text"
          value={navInput} 
          onChange={(e) => setNavInput(e.target.value)}
          placeholder="Search anime..."
          className="w-full px-4 py-2 bg-purple-950/50 text-white rounded-md border border-purple-700/50 outline-none focus:border-red-500 text-sm"
        />
          </form>
          <Link 
            to="/" 
            onClick={handleResetSearch} 
            className="text-purple-200 hover:text-white p-2 hover:bg-purple-800/50 rounded-md transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/upcoming" 
            onClick={() => setIsOpen(false)} 
            className="text-purple-200 hover:text-white p-2 hover:bg-purple-800/50 rounded-md transition-colors"
          >
            Upcoming
          </Link>
          <Link 
            to="/watchlist" 
            onClick={() => setIsOpen(false)} 
            className="text-purple-200 hover:text-white p-2 hover:bg-purple-800/50 rounded-md transition-colors"
          >
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;