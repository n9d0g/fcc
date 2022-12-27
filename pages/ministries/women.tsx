import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Women = () => {
  return (
    <Layout title="FCC | Women">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center px-6 py-[10rem]">
        <div className="flex flex-col flex-1 gap-y-8 pr-4">
          <h1 className="text-5xl font-bold leading-snug">Women's Ministry.</h1>
          <p>
            Our women’s ministry is here to encourage and help you connect with
            God and other women.
          </p>
          <p>
            The women at Woodside have discovered that real life is only worth
            living in a relationship with Jesus. You are of infinite value to
            Him, and He is worth belonging to. He will never abandon you. He
            will always love you – laugh lines, messes and all.
          </p>
          <p>
            At FCC we believe that we will find real life with Jesus through
            studying the Bible together, praying and building community.
          </p>
          <p>
            For more information for the Women's Ministry at FCC, please contact
            Sis Joi Irong.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/ministries/women.jpg"
            width={800}
            height={100}
            alt="Give Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Women
