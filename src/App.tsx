import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Sermons from './pages/sermons/Sermons';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='sermons' element={<Sermons />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
