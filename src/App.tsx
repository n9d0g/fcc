import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Zoom from './components/zoom/Zoom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Sermons from './pages/sermons/Sermons';
import Ministries from './pages/ministries/Ministries';
import Give from './pages/give/Give';

function App() {
  return (
    <BrowserRouter>
      <div className="fcc">
        <Zoom />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='sermons' element={<Sermons />} />
            <Route path='ministries' element={<Ministries />} />
            <Route path='give' element={<Give />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
