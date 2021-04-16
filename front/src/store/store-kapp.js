import axios from 'axios'

const state = {
  getInfo: {},
  walletCreated: {},
  listWallet: [],
  privateKey: ''
}

const mutations = {
  setGetInfo (state, value) {
    state.getInfo = value
  },
  setCreateNewWallet (state, value) {
    state.walletCreated = value
  },
  setListWallet (state, value) {
    state.listWallet = value
  },
  setPrivateKey (state, value) {
    state.privateKey = value
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
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpCreateNewWallet ({ commit }) {
    axios
      .get('/createwallet')
      .then((res) => {
        console.log('store kapp', res.data.data)
        commit('setCreateNewWallet', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetListWallet ({ commit }) {
    axios
      .get('/listwallet')
      .then((res) => {
        console.log('list wallet:', res.data.data)
        commit('setListWallet', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetPrivateKey ({ commit }, payload) {
    axios
      .post('/getprivatekey', {
        public_key: payload
      })
      .then((res) => {
        // console.log('privatekey:', res.data.data)
        commit('setPrivateKey', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  }
}

const getters = {
  privateKeyRecieve: state => {
    return state.privateKey
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}