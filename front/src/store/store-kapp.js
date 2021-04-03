import axios from 'axios'

const state = {
  getBlockCount: ""
}

const mutations = {
  setGetBlockCount (state, value) {
    state.getBlockCount = value
  }
}

const actions = {
  httpGetBlockCount ({ commit }) {
    axios
      .get('/getblockcount')
      .then((res) => {
        console.log('store kapp', res.data)
        commit('setGetBlockCount', res.data.result.toString())
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