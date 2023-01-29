import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const UniversityBibleStudy = () => {
  return (
    <Layout title="FCC | University Bible Study">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">
            University Bible Study.
          </h1>
          <p>
            University Bible Study exists for students to explore the biggest
            questions of life in an amazing community that has Jesus at the
            centre.
          </p>
          <p>
            For more information about the University Bible Study Small Group at
            FCC, please contact Sis Raquel Quiambao.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/youth.jpg"
            width={800}
            height={100}
            alt="University Bible Study Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default UniversityBibleStudy
