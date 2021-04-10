import axios from 'axios'

const state = {
  getInfo: {}
}

const mutations = {
  setGetInfo (state, value) {
    state.getInfo = value
  }
}

const actions = {
  httpGetInfo ({ commit }) {
    axios
      .get('/getinfo')
      .then((res) => {
        console.log('store kapp', res.data.data)
        commit('setGetInfo', res.data.data)
      })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}