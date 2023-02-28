import { Layout } from '../components/util/Layout'
import Modal from '../components/util/Modal'
import Messages from '../data/messages.json'

const MessagesPage = () => {
  return (
    <Layout title={'FCC | Messages'}>
      <section className="flex flex-col container gap-6 justify-around items-center p-6 overflow">
        <h1 className="text-5xl font-bold leading-snug">2023 Messages</h1>

        <div className="flex flex-col w-full">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  {Messages.map((message, i) => (
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
                              SPEAKER
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              TOPIC
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              SUGGESTED SCRIPTURE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              OBJECTIVE OF THE MESSAGE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              SUMMARY
                            </th>
                          </tr>
                        </thead>
                      )}
                      <tbody key={message.date}>
                        <tr className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {message.date}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {message.speaker}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={message.date}
                              title="Topic"
                              text={message.topic}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={message.date}
                              title="Suggested Scripture"
                              text={message.scripture}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={message.date}
                              title="Objective"
                              text={message.objective}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={message.date}
                              title="Summary"
                              text={message.summary}
                            />
                          </td>
                        </tr>
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
