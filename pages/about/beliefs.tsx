import { Layout } from '../../components/util/Layout'
import BeliefItem from '../../components/util/beliefs/BeliefItem'
import CoreValuesData from '../../data/CoreValuesData'
import StatementOfFaithData from '../../data/StatementOfFaithData'

const Beliefs = () => {
  return (
    <Layout title="FCC | Beliefs">
      <main className="flex min-h-[80vh] items-start justify-center">
        <section className="container flex flex-col items-center h-full mt-[12rem] px-4 sm:px-6">
          <h1 className="text-5xl font-bold">What We Believe</h1>
          <h2 className="self-start text-3xl font-bold mt-10">Core Values</h2>
          <p className="self-start my-10">
            What we believe determines what we value, and what we value defines
            how we live. We are committed to 11 core values that can be read
            below:
          </p>
          {CoreValuesData.map(belief => (
            <BeliefItem
              key={belief.title}
              title={belief.title}
              text={belief.text}
            />
          ))}
          <h2 className="self-start text-3xl font-bold mt-10">
            Statement of Faith
          </h2>
          <p className="self-start my-10">
            Our Statement of Faith identifies the core beliefs of The Christian
            and Missionary Alliance.
          </p>
          {StatementOfFaithData.map(belief => (
            <BeliefItem
              key={belief.title}
              title={belief.title}
              text={belief.text}
            />
          ))}
        </section>
      </main>
    </Layout>
  )
}

export default Beliefs
