import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Preteens = () => {
  return (
    <Layout title="FCC | Preteens">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            Preteen's Ministry.
          </h1>
          <p>
            We at FCC desire to see the youth ministry grounded in the mission
            of Jesus Christ and the Church, directed toward growth in Christian
            discipleship. In Scripture, our hope is found in passages like this
            one in Jeremiah (29:11) where we read; "For I know the plans I have
            for you, declares the Lord, plans to prosper you and not to harm
            you, plans to give you hope and a future."
          </p>
          <p>
            For more information of these and other upcoming events with the
            Preteen's Ministry at FCC, please contact Sis Raquel Quiambao.
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

export default Preteens
