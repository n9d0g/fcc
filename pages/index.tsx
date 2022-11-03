import FccHead from '../components/FccHead'
import FccFooter from '../components/FccFooter'
import Hero from '../components/home/Hero'
import FccHeader from '../components/FccHeader'

export default function Home() {
  return (
    <>
      <FccHead title="FCC | Home" />
      <FccHeader />
      <main>
        <Hero />
      </main>
      {/* <FccFooter /> */}
    </>
  )
}
