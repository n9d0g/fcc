import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Men = () => {
  return (
    <Layout title="FCC | Men">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">Men's Ministry.</h1>
          <p>
            Our various activities, events and groups are all geared towards
            helping MEN of all ages come together for times of fun, fellowship
            and teaching with the goals of becoming the spiritual leaders God
            has designed them to be.
          </p>
          <p>
            For more information of these and other upcoming events with the
            Men's Ministry at FCC, please contact Bro June Bermudo.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/men.jpg"
            width={800}
            height={100}
            alt="Men Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Men
