import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const WomenChasingGod = () => {
  return (
    <Layout title="FCC | Women Chasing God">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            Women Chasing God Small Group.
          </h1>
          <p>
            The Women Chasing God Small Group is a great way for women to
            fellowship with believers and to learn more about God and His Word.
            Our small group studies range from topical studies from a book in
            the Bible to theologically based book studies that help us grow in
            our understanding of God and His purposes.
          </p>
          <p>
            For more information about the Women Chasing God Small Group at FCC,
            please contact Sis Joi Irong.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/women.jpg"
            width={800}
            height={100}
            alt="Women Chasing God Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default WomenChasingGod
