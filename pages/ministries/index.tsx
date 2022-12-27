import React from 'react'
import MinistriesItem from '../../components/ministries/MinistriesItem'
import { Layout } from '../../components/util/Layout'

const Ministries = () => {
  return (
    <Layout title="FCC | Ministries">
      <section className="flex flex-col justify-center items-center w-full p-6">
        <h1 className="flex self-start text-5xl my-6">Ministries</h1>
        <p className="self-start text-gray-500">Browse the ministries below:</p>
        <ul className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 w-full py-6 gap-8">
          <MinistriesItem
            href="/ministries/men"
            title="Men"
            description="Join the men of FCC in learning what it really means to be a man of God."
            img="/ministries/men.jpg"
          />
          <MinistriesItem
            href="/ministries/women"
            title="Women"
            description="Come join the women of FCC as they explore godly womenhood."
            img="/ministries/women.jpg"
          />
          <MinistriesItem
            href="/ministries/preteens"
            title="Pre-teens"
            description="What does it mean to be a Christian to your friends? Come join pre-teens ministry to find out."
            img="/ministries/preteens.jpg"
          />
          <MinistriesItem
            href="/ministries/youth"
            title="Youth"
            description="See why Jesus is the true fountain of youth."
            img="/ministries/youth.jpg"
          />
          <MinistriesItem
            href="/ministries/young-adults"
            title="Young Adults"
            description="How can I be a good Christian at school? Work? Dating? Come to FCC YA ministry to find out."
            img="/ministries/young-adults.jpg"
          />
          <MinistriesItem
            href="/ministries/praise"
            title="Praise & Worship"
            description="The true worshippers will worship the Father in Spirit and in Truth. Come join!"
            img="/ministries/praise.jpg"
          />
        </ul>
      </section>
    </Layout>
  )
}

export default Ministries
