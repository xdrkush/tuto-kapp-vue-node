import axios from 'axios'

const state = {
  chainAvailable: []
}

const mutations = {
  setChainAvailable (state, value) {
      state.chainAvailable = value
  }
}

const actions = {
    async httpGetChainAvailable({ commit }) {
        await axios.get('/chainavailable').then(res => {
            console.log(res)
            if (res.status !== 200) return
            else commit('setChainAvailable', res.data.chain)
        })
    },
    async httpRunChain({ commit }, payload) {
        await axios.post('/runchain', payload).then(res => {
            if (res.status !== 200) return
            else commit('setChainAvailable', res.data.chain)
        })
    }
}

const getters = {
    getChainAvailable: state => {
        return state.chainAvailable
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}