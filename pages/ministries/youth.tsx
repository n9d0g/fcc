import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Youth = () => {
  return (
    <Layout title="FCC | Youth">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">Youth Ministry.</h1>
          <p>
            We at Freedom in Christ Church care deeply about the unique life
            experiences facing our teens today. We have small groups available
            for all ages, and a growing core of young people eager to grow in
            their faith.
          </p>
          <p>
            For more information of these and other upcoming events with the
            Youth Ministry at FCC, please contact Sis Raquel Quiambao.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/preteens.jpg"
            width={800}
            height={100}
            alt="Give Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Youth
