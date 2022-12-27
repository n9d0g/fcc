import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const YoungAdults = () => {
  return (
    <Layout title="FCC | Young Adults">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            Young Adults Ministry.
          </h1>
          <p>
            We are the Young Adults ministry of Freedom in Christ Church. We’re
            here to grow with you as you step into your destiny. If you are
            between the ages of 18-35+ and whether you’re single, in a
            relationship or married, you are so welcome with us! We want to
            create an environment where you will not only feel apart of
            something that is thriving and full of life, but that you are
            thriving in the life that God has for you. We want to connect you to
            others and empower you to fulfil God's calling on your life.
          </p>
          <p>
            For more information of these and other upcoming events with the
            Young Adults Ministry at FCC, please contact Bro John Benologa.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/young-adults.jpg"
            width={800}
            height={100}
            alt="Young Adults Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default YoungAdults
