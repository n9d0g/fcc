import { Layout } from '../components/util/Layout'

const PageNotFound = () => {
  return (
    <Layout title="FCC | Page Not Found">
      <section className="flex flex-col gap-4">
        <h1 className="text-7xl">404</h1>
        <p>Page Not Found</p>
      </section>
    </Layout>
  )
}

export default PageNotFound
