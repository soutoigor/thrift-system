import axios from '@/plugins/axios'

export const store = (attributes) => axios
  .post('/client', attributes)

export const index = (params) => axios
  .get('/client', { params })

export const update = (id, attributes) => axios
  .patch(`/client/${id}`, attributes)

export const destroy = (id) => axios
  .delete(`/client/${id}`)

export default {
  store,
  index,
  update,
  destroy,
}
