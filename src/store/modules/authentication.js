import { store, login, show } from '@/api/authentication'
import axios from '@/plugins/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    token: localStorage.getItem('token') || '',
    user: {},
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_TOKEN(state, payload) {
      localStorage.setItem('token', payload)
      state.token = payload
      axios.defaults.headers.common.Authorization = `Bearer ${payload}`
    },
    SET_USER(state, payload) {
      state.user = { ...state.user, ...payload }
    },
  },
  actions: {
    login({ commit }, credentials) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        login(credentials)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    createAccount({ commit }, attributes) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        store(attributes)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    getUser({ commit }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        show()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    setUser({ commit }, { email, name, id }) {
      commit('SET_USER', { email, name, id })
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    logout({ commit, dispatch }) {
      commit('SET_TOKEN', null)
      dispatch('setUser', {})
      commit('SET_LOADING', false)
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    isAuthenticated: (state) => state.token,
    userName: (state) => state.user.name || '',
  },
}
