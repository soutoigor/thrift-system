import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import category from './modules/category'
import client from './modules/client'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    category,
    client,
  },
})
