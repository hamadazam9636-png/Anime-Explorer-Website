
import gitLogo from "../assets/github(37).jpg"
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-950 border-t border-purple-900/60 text-purple-300/80 text-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Branding */}
        <div className="flex items-center gap-2 font-sans tracking-wide">
          <span className="text-white font-black tracking-wider text-base">
            ANIME<span className="text-red-500">HOUSE</span>
          </span>
          <span className="text-purple-500/50">|</span>
          <p className="text-xs">
            &copy; {currentYear} All Animes Available.
          </p>
        </div>

        {/* Right Side: GitHub Creator Link */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/hamadazam9636-png" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/20 border border-purple-800/40 text-xs font-medium text-purple-200 hover:text-white hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 group"
          >
            <span>
              <img src={gitLogo} alt="GitHub" className="w-5 h-5" />
            </span>
            <span>Developed by <span className="font-bold tracking-wide group-hover:text-red-400">Hamad Azam</span></span>
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;