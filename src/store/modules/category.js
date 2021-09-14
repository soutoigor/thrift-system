import {
  store,
  index,
  update,
  destroy,
} from '@/api/category'

export default {
  namespaced: true,
  state: {
    loading: false,
    categories: [],
    filter: null,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
    SET_FILTER(state, payload) {
      state.filter = payload
    },
  },
  actions: {
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },
    createCategory({ commit }, attributes) {
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
    listCategory({ commit }, filters = {}) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index(filters)
          .then(({ data: { categories } }) => {
            commit('SET_CATEGORIES', categories)
            resolve(categories)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    updateCategory({ commit }, { id, attributes }) {
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
    deleteCategory({ commit }, id) {
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
    categories: (state) => (state.filter
      ? state.categories.filter(
        (category) => category.name.toLowerCase().includes(state.filter.toLowerCase()),
      )
      : state.categories
    ),
  },
}
