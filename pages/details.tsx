import { Layout } from '../components/util/Layout'
import Modal from '../components/util/Modal'
import Services from '../data/details.json'

const Details = () => {
  return (
    <Layout title={'FCC | Details'}>
      <section className="flex flex-col container gap-6 justify-around items-center p-6 overflow">
        <h1 className="text-5xl font-bold leading-snug">Details</h1>

        <div className="flex flex-col w-full">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  {Services.map((service, i) => (
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
                              OPENING PRAYER VERSE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              OPENING PRAYER
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              OFFERING VERSE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              OFFERING PRAYER
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              SCRIPTURE READING
                            </th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        <tr className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {service.DATE}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={service.DATE}
                              title="Offering Prayer Verse"
                              text={service['Opening Prayer verse']}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={service.DATE}
                              title="Opening Prayer"
                              text={service['Opening prayer']}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={service.DATE}
                              title="Offering Verse"
                              text={service['Offering verse']}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={service.DATE}
                              title="Offering Prayer"
                              text={service['Offering prayer']}
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Modal
                              date={service.DATE}
                              title="Scripture Reading"
                              text={service['Scripture reading']}
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

export default Details
