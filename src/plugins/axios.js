import axios from 'axios'

const axiosSettings = axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_ROOT_API,
})

axiosSettings.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRoute = error.response.config.url === '/login'
    const isUnauthorized = error.response.status === 401

    if (isUnauthorized && !isLoginRoute) {
      window.location = '/login'
    }

    return Promise.reject(error)
  },
)

export default axiosSettings
