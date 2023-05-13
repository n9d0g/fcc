import { headData, client } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
  const data = await client.fetch(`
    *[_type == "prayer"] {
			name, date, scripture
    }
  `)

  if (data) {
    return {
      data: updatedDataFiltered(data, 'date'),
      headData: headData.ministriesPrayer,
    }
  }
  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}
