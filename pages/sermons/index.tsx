import { Layout } from '../../components/util/Layout'
import SermonItem from '../../components/util/sermons/SermonItem'

const Sermons = () => {
  return (
    <Layout title="FCC | Sermons">
      <main className="flex flex-col min-h-[80vh] items-start justify-start sm: mx-4">
        <section className="container flex flex-col items-center h-full mt-[12rem] px-4 sm:px-6 mx-auto">
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
      </main>
    </Layout>
  )
}

export default Sermons
