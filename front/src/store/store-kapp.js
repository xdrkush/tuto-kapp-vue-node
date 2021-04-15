import axios from 'axios'

const state = {
  getInfo: {},
  walletCreated: {}
}

const mutations = {
  setGetInfo (state, value) {
    state.getInfo = value
  },
  setCreateNewWallet (state, value) {
    state.walletCreated = value
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
  },
  createNewWallet ({ commit }) {
    axios
      .get('/createwallet')
      .then((res) => {
        console.log('store kapp', res.data.data)
        commit('setCreateNewWallet', res.data.data)
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