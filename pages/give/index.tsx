import { Layout } from '../../components/util/Layout'
import Image from 'next/image'

const Give = () => {
  return (
    <Layout title="FCC | Give">
      <section className="flex flex-col md:flex-row container gap-6 justify-around items-center p-6">
        <div className="flex flex-col flex-1 gap-y-8">
          <h1 className="text-5xl leading-snug">
            Generosity is a Form of Worship.
          </h1>
          <p>
            When we give through tithes and offerings from the blessings God has
            provided, it displays our worship, gratitude, and devotion to Him.
            Thank you for sowing into all that God is doing!
          </p>
          <p>
            You can give online by sending an e-transfer to{' '}
            <span className="text-blue font-semibold hover:underline">
              <a href="emailto:fcc.fcac@gmail.com">fcc.fcac@gmail.com</a>
            </span>
            , or by filling out one of our offering envelopes at our Sunday
            services located at 5225 Orbitor Drive, Mississauga, ON.
          </p>
        </div>
        <div className="hidden sm:flex relative flex-1 justify-center items-center">
          <Image
            className="rounded-md"
            src="/give.jpg"
            width={800}
            height={100}
            alt="Give Image"
          />
        </div>
      </section>
    </Layout>
  )
}

export default Give
