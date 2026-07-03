import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToWatchlist } from "../utils/AddToWatchList";
import gokuImg from "../assets/Goku.jpg";
import JinwooImg from "../assets/Jinwoo.webp";
import NarutoImg from "../assets/Naruto.webp";
import GojoImg from "../assets/Gojo.webp";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const navigate = useNavigate();

  const slidesData = [
    {
      title: "Dragon Ball Z",
      accent: "🔥 Saiyan Legend",
      gradient: "from-red-600 to-amber-500",
      btnGlow: "shadow-[0_4px_20px_rgba(220,38,38,0.4)]",
      btnBg: "bg-red-600 hover:bg-red-500",
      desc: "Unleash the ultimate power. Follow the legendary journey of Goku and the Z-Fighters defending Earth against interstellar threats.",
      img: gokuImg,
    },
    {
      title: "Solo Leveling",
      accent: "⚡ Shadow Monarch",
      gradient: "from-blue-600 to-purple-500",
      btnGlow: "shadow-[0_4px_20px_rgba(37,99,235,0.4)]",
      btnBg: "bg-blue-600 hover:bg-blue-500",
      desc: "Witness the rise of Sung Jin-Woo from the weakest hunter of all mankind to the absolute ruler of shadows.",
      img: JinwooImg,
    },
    {
      title: "Naruto Shippuden",
      accent: "🦊 Hidden Leaf Hokage",
      gradient: "from-orange-600 to-yellow-500",
      btnGlow: "shadow-[0_4px_20px_rgba(234,88,12,0.4)]",
      btnBg: "bg-orange-600 hover:bg-orange-500",
      desc: "Believe it! Explore the deep lore of the shinobi world, intense ninja battles, and the undying resolve of Naruto Uzumaki.",
      img: NarutoImg, 
    },
    {
      title: "Jujutsu Kaisen",
      accent: "👁️ The Honored One",
      gradient: "from-cyan-600 to-indigo-500",
      btnGlow: "shadow-[0_4px_20px_rgba(8,145,178,0.4)]",
      btnBg: "bg-cyan-600 hover:bg-cyan-500",
      desc: "Step into the domain. Experience the infinite void with Gojo Satoru, the strongest jujutsu sorcerer in existence.",
      img: GojoImg, 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false); 
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
        setAnimate(true); 
      }, 300); 
    }, 3000); 

    return () => clearInterval(timer);
  }, [slidesData.length]);

  const current = slidesData[currentSlide];
  const handleExplore = (title) => {
    navigate(`/search/${encodeURIComponent(title)}`); 
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] overflow-hidden bg-purple-950 flex items-center transition-all duration-500">
      
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={current.img} 
          alt={current.title} 
          loading="eager"
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${animate ? 'scale-100 opacity-100' : 'scale-105 opacity-40'}`} 
        />
        <div className="absolute inset-0 bg-linear-to-r from-purple-950 via-purple-950/75 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-purple-950 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 z-10 text-white">
        <div className="max-w-2xl flex flex-col gap-4 md:gap-6">
          
          <span className={`inline-block text-xs md:text-sm font-bold tracking-widest text-white uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20 w-fit transition-all duration-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {current.accent}
          </span>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Explore <span className={`text-transparent bg-clip-text bg-linear-to-r ${current.gradient}`}>{current.title}</span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg text-purple-100/90 font-light leading-relaxed h-15 sm:h-auto transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {current.desc}
          </p>

          <div className={`flex flex-wrap gap-4 mt-2 transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button 
              className={`px-6 py-3 text-white font-semibold rounded-lg hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 text-sm md:text-base ${current.btnBg} ${current.btnGlow}`}
              onClick={() => handleExplore(current.title)}
            >
              Explore Now
            </button>
            <button 
              onClick={() => addToWatchlist({
                id: current.title.toLowerCase().replace(/\s+/g, '-'), 
                attributes: {
                  canonicalTitle: current.title,
                  synopsis: current.desc,
                  posterImage: { 
                    medium: current.img 
                  } 
                }
              })}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold cursor-pointer rounded-lg backdrop-blur-sm hover:scale-105 active:scale-95 transition-all duration-200 text-sm md:text-base"
            >
              Add to Watchlist
            </button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAnimate(false);
              setTimeout(() => {
                setCurrentSlide(index);
                setAnimate(true);
              }, 200);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>

    </div>
  );
}

export default HeroSection;