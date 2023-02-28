import { Layout } from '../../components/util/Layout'
import Leader from '../../components/util/leadership/Leader'

const Leadership = () => {
  return (
    <Layout title="FCC | Leadership">
      <main className="flex flex-col min-h-[80vh] items-start justify-start sm: mx-4">
        <section className="container flex flex-col items-center h-full mt-[12rem] px-4 sm:px-6 mx-auto">
          <h1 className="self-start text-5xl font-bold">Leadership</h1>
          <p className="self-start my-10">
            This is the apostolic team that provides spiritual and
            organizational oversight for everything that happens at FCC.
          </p>
        </section>
        <section className="container grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center mx-auto my-10">
          <Leader
            name="Roland Yumul"
            description="Elder"
            img="/leadership/rolando.jpg"
          />
          <Leader
            name="Errol Rasco"
            description="Elder"
            img="/leadership/errol.jpg"
          />
          <Leader
            name="Lolita Irong"
            description="Church Advisor"
            img="/leadership/lolita.jpg"
          />
          <Leader
            name="Cherry Macasaquit"
            description="Church Secretary"
            img="/leadership/cherry.jpg"
          />
          <Leader
            name="James Quiambao"
            description="Deacon - Church Administration"
            img="/leadership/james.jpg"
          />
          <Leader
            name="John Benologa"
            description="Deacon - Church Programming"
            img="/leadership/john.jpg"
          />
          <Leader
            name="Ian Irong"
            description="Deacon - Church Outreach"
            img="/leadership/ian.jpg"
          />
          <Leader
            name="Ymuz Cruz"
            description="Deacon - Church Edification"
            img="/leadership/ymuz.jpg"
          />
        </section>
      </main>
    </Layout>
  )
}

export default Leadership
