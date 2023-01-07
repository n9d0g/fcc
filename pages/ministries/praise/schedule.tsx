import { Temporal } from '@js-temporal/polyfill'
import { Layout } from '../../../components/util/Layout'
import PraiseModal from '../../../components/util/PraiseModal'
import Schedule from '../../../data/praise.json'

const MessagesPage = () => {
  const now = Temporal.Now.plainDateISO().toString()

  return (
    <Layout title={'FCC | Praise Schedule'}>
      <section className="flex flex-col container gap-6 justify-around items-center p-6 overflow">
        <h1 className="text-5xl font-bold leading-snug">Praise Schedule</h1>
        <div className="flex flex-col w-full">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  {Schedule.map((week, i) => (
                    <>
                      {i === 0 && (
                        <thead className="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              DATE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              LEAD
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              GUITAR
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              KEYS
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              BASS
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              DRUMS
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              BACKUP
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              AV
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              DETAILS
                            </th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {week.dateTemporal >= now && (
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {week.date}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.lead}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.guitar}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.keys}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.bass}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.drums}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.backup}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {week.av}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <PraiseModal
                                date={week.date}
                                title="Summary"
                                messageTitle={week.title}
                                objective={week.objective}
                                text={week.summary}
                                topic={week.topic}
                                scripture={week.scripture}
                                summary={week.summary}
                                speaker={week.speaker}
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default MessagesPage
