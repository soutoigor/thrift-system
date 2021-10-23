import {
  store,
  index,
  update,
  destroy,
} from '@/api/client'

export default {
  namespaced: true,
  state: {
    loading: false,
    clients: [],
    filter: null,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_CLIENTS(state, payload) {
      state.clients = payload
    },
    SET_FILTER(state, payload) {
      state.filter = payload
    },
  },
  actions: {
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },
    createClient({ commit }, attributes) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        store(attributes)
          .then(({ data }) => resolve(data))
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    listClient({ commit }, filters = {}) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index(filters)
          .then(({ data: { clients } }) => {
            commit('SET_CLIENTS', clients)
            resolve(clients)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    updateClient({ commit }, { id, attributes }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        update(id, attributes)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    deleteClient({ commit }, id) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    clients: (state) => (state.filter
      ? state.clients.filter(
        (client) => client.name.toLowerCase().includes(state.filter.toLowerCase()),
      )
      : state.clients
    ),
  },
}
