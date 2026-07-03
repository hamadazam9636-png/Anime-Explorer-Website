import { BrowserRouter, Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AnimeDetails from "./pages/AnimeDetails"
import Footer from "./components/Footer"
import WatchList from "./pages/WatchList"
import UpcomingAnime from "./pages/UpcomingAnime"
function App() {
 

  return (
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/anime/:id" element={<AnimeDetails/>}/>
    <Route path="/Search/:query" element={<Home/>}/>
    <Route path="/watchlist" element={<WatchList/>}/>
    <Route path="/upcoming" element={<UpcomingAnime/>} />
  </Routes>
  <Footer/>
</BrowserRouter>

    
  )
}

export default App
