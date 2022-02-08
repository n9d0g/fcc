import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home';
import About from './pages/about/About';
import Beliefs from './pages/about/Beliefs';
import { MissionVision } from './pages/about/MissionVision';
import Leadership from './pages/about/Leadership';
import Sermons from './pages/sermons/Sermons';
import Ministries from './pages/ministries/Ministries';
import Men from './pages/ministries/Men';
import Women from './pages/ministries/Women';
import Preteens from './pages/ministries/Preteens';
import Youth from './pages/ministries/Youth';
import YA from './pages/ministries/YA';
import Praise from './pages/ministries/Praise';
import SmallGroups from './pages/small-groups/SmallGroups';
import Give from './pages/give/Give';
import FiftyFivePlus from './pages/small-groups/FiftyFivePlus';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import Mississauga from './pages/small-groups/Mississauga';
import Brampton from './pages/small-groups/Brampton';
import Philippines from './pages/small-groups/Philippines';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="fcc">
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />

            {/* about */}
            <Route path='about' element={<About />} />
            <Route path='about/beliefs' element={<Beliefs />} />
            <Route path='about/mission-vision' element={<MissionVision />} />
            <Route path='about/leadership' element={<Leadership />} />

            <Route path='sermons' element={<Sermons />} />

            {/* ministries */}
            <Route path='ministries' element={<Ministries />} />
            <Route path='ministries/men' element={<Men />} />
            <Route path='ministries/women' element={<Women />} />
            <Route path='ministries/preteens' element={<Preteens />} />
            <Route path='ministries/youth' element={<Youth />} />
            <Route path='ministries/ya' element={<YA />} />
            <Route path='ministries/praise' element={<Praise />} />

            {/* small groups */}
            <Route path='smallgroups' element={<SmallGroups />} />
            <Route path='smallgroups/55plus' element={<FiftyFivePlus />} />
            <Route path='smallgroups/mississauga' element={<Mississauga />} />
            <Route path='smallgroups/brampton' element={<Brampton />} />
            <Route path='smallgroups/philippines' element={<Philippines />} />

            {/* give */}
            <Route path='give' element={<Give />} />
          </Routes>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
