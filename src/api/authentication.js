import axios from '@/plugins/axios'

export const login = (credentials) => axios
  .post('/login', credentials)

export const store = (attributes) => axios
  .post('/user', attributes)

export const show = () => axios.get('/user')

export default {
  login,
  store,
  show,
}
