import { Layout } from '../../../components/util/Layout'
import Image from 'next/image'

const Praise = () => {
  return (
    <Layout title="FCC | Praise">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            Praise & Worship Ministry.
          </h1>
          <p>
            As a church, we are passionate about pursuing God and encountering
            Him in the place of praise and worship! We like to take time at the
            start of our services to pour out our love and devotion to Him with
            music and singing. Our team is dedicated to leading the church
            deeper into God's presence through heartfelt and authentic worship.
          </p>
          <h2 className="font-bold text-xl">Get Involved</h2>
          <p>
            We are excited for the journey that God is taking us on as a church
            family, and we have a vision to lead with passion and excellence! We
            are looking for musicians and singers with any level of skill on
            their instrument to join our worship team.
          </p>
          <p>
            If you are interested in getting involved with our worship teams
            please contact either Bro John Benologa or Nathan Lardizabal!
          </p>
          <div>
            <a href="/ministries/praise/schedule">
              <button className="bg-white text-black p-6 border rounded">
                Schedule
              </button>
            </a>
          </div>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/praise.jpg"
            width={800}
            height={100}
            alt="Praise Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Praise
