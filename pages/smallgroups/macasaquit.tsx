import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Macasaquit = () => {
  return (
    <Layout title="FCC | Macasaquit Bible Study">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            Macasaquit Bible Study.
          </h1>
          <p>
            Macasaquit's Bible Study meets every week on Tuesdays at 111 Address
            St! Come join us learn more about the Word of God.
          </p>
          <p>
            For more information about the South Mississauga Small Group at FCC,
            please contact Bro Allan Macasaquit.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/men.jpg"
            width={800}
            height={100}
            alt="Macasaquit Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Macasaquit
