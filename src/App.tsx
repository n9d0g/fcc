import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/home/Home'
import { About } from './pages/about/About'
import { Beliefs } from './pages/about/Beliefs'
import { MissionVision } from './pages/about/MissionVision'
import { Leadership } from './pages/about/Leadership'
import { Sermons } from './pages/sermons/Sermons'
import { Ministries } from './pages/ministries/Ministries'
import { Men } from './pages/ministries/Men'
import { Women } from './pages/ministries/Women'
import { Preteens } from './pages/ministries/Preteens'
import { Youth } from './pages/ministries/Youth'
import { YA } from './pages/ministries/YA'
import { Praise } from './pages/ministries/Praise'
import { SmallGroups } from './pages/small-groups/SmallGroups'
import { Give } from './pages/give/Give'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Mississauga } from './pages/small-groups/Mississauga'
import { WomenChasingGod } from './pages/small-groups/WomenChasingGod'
import { Allan } from './pages/small-groups/Allan'
import { Yumul } from './pages/small-groups/Yumul'
import styled from 'styled-components'

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FCC>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* about */}
          <Route path="about" element={<About />} />
          <Route path="about/beliefs" element={<Beliefs />} />
          <Route path="about/mission-vision" element={<MissionVision />} />
          <Route path="about/leadership" element={<Leadership />} />

          <Route path="sermons" element={<Sermons />} />

          {/* ministries */}
          <Route path="ministries" element={<Ministries />} />
          <Route path="ministries/men" element={<Men />} />
          <Route path="ministries/women" element={<Women />} />
          <Route path="ministries/preteens" element={<Preteens />} />
          <Route path="ministries/youth" element={<Youth />} />
          <Route path="ministries/ya" element={<YA />} />
          <Route path="ministries/praise" element={<Praise />} />

          {/* small groups */}
          <Route path="smallgroups" element={<SmallGroups />} />
          <Route path="smallgroups/yumul" element={<Yumul />} />
          <Route path="smallgroups/mississauga" element={<Mississauga />} />
          <Route
            path="smallgroups/women-chasing-god"
            element={<WomenChasingGod />}
          />
          <Route path="smallgroups/allan" element={<Allan />} />

          {/* give */}
          <Route path="give" element={<Give />} />
        </Routes>
        <Footer />
      </FCC>
    </BrowserRouter>
  )
}

const FCC = styled.div``
