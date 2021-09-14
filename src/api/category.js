import axios from '@/plugins/axios'

export const store = (attributes) => axios
  .post('/category', attributes)

export const index = (params) => axios
  .get('/category', { params })

export const update = (id, attributes) => axios
  .patch(`/category/${id}`, attributes)

export const destroy = (id) => axios
  .delete(`/category/${id}`)

export default {
  store,
  index,
  update,
  destroy,
}
