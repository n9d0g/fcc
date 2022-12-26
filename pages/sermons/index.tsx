import { Layout } from '../../components/util/Layout'
import SermonItem from '../../components/util/sermons/SermonItem'

const Sermons = () => {
  return (
    <Layout title="FCC | Sermons">
      <section className="flex flex-col justify-center items-center w-full px-6">
        <h1 className="text-5xl font-bold pt-4">Sermons</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full py-10">
          <SermonItem />
          <SermonItem />
          <SermonItem />
          <SermonItem />
          <SermonItem />
          <SermonItem />
          <SermonItem />
          <SermonItem />
        </ul>
      </section>
    </Layout>
  )
}

export default Sermons
