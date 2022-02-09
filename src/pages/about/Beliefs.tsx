import { Accordion } from '../../components/accordion/Accordion'
import { CoreValues } from '../../data/CoreValues'
import { StatementOfFaith } from '../../data/StatementOfFaith'
import useDocumentTitle from '../../hooks/useDocumentTitle'

function Beliefs() {
  useDocumentTitle('Beliefs')
  return (
    <div className="beliefs">
      <section className="beliefs-banner">
        <h1 className="beliefs-banner-title">our beliefs</h1>
      </section>
      <section className="beliefs-intro">
        <p>
          The Christian and Missionary Alliance (C&MA) in Canada is a family of
          churches; we make disciples and multiply transformational churches in
          Canada and the world to the glory of the Triune God.
        </p>
      </section>
      <section className="beliefs-content">
        <article className="beliefs-content-core-values">
          <h2>Core Values</h2>
          What we believe determines what we value, and what we value defines
          how we live. We are committed to 11 core values that can be read
          below:
          <Accordion data={CoreValues} />
        </article>
        <article className="beliefs-content-statement-of-faith">
          <h2>Statement of Faith</h2>
          Our Statement of Faith identifies the core beliefs of The Christian
          and Missionary Alliance.
          <Accordion data={StatementOfFaith} />
        </article>
      </section>
    </div>
  )
}

export default Beliefs
