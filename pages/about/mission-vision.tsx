import { Layout } from '../../components/util/Layout'

const MissionVision = () => {
  return (
    <Layout title="FCC | Mission & Vision">
      <main className="flex min-h-[80vh] items-start justify-center">
        <section className="container flex flex-col items-center h-full mt-[12rem] px-4 sm:px-6">
          <h1 className="text-5xl font-bold self-start mb-10">
            Mission and Vision
          </h1>
          <div className="my-5 self-start">
            <h2 className="text-3xl font-bold self-start">Our Mission</h2>
            <p className="self-start my-5">
              To introduce and represent Christ through our nurturing, small
              group-driven ministries in the community.
            </p>
          </div>
          <div className="my-5 self-start">
            <h2 className="text-3xl font-bold self-start">Our Vision</h2>
            <p className="self-start my-5">
              A Christ-centred, Holy Spirit-led community committed to the
              building of strong relationships and planting of healthy
              reproducing churches.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default MissionVision
