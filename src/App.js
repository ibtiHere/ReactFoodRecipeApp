import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from "./pages/home";
import Favroties from './pages/favoraites';
import Details from './pages/details';
function App() {
  return (
    <div className="min-h-screen p-6 bg-white text-gray-600 text-1g">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favoraites' element={<Favroties />} />
        <Route path='/recipe-item/:id' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;