import axios from 'axios'

const state = {
  getTotalBalance: {},
  zListAddresses: [],
  walletZCreated: {},
  modalZBalance: {},
  zPrivateKey: '',
  zOpId: {}
}

const mutations = {
  setGetTotalBalance (state, value) {
    state.getTotalBalance = value
  },
  setZListAddresses (state, value) {
    state.zListAddresses = value
  },
  setCreateNewWalletZ (state, value) {
    state.walletZCreated = value
  },
  setModalZBalance (state, value) {
    state.modalZBalance = value
  },
  setZPrivateKey (state, value) {
    state.zPrivateKey = value
  },
  setZOpId (state, value) {
    state.zOpId = value
  }
}

const actions = {
  httpGetTotalBalance ({ commit }) {
    axios
      .get('/gettotalbalance')
      .then((res) => {
        console.log('store GetTotalBalance: ', res.data.data)
        commit('setGetTotalBalance', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetZBalance ({ commit }, payload) {
    axios
      .post('/getzaddressbalance', payload)
      .then((res) => {
        const zBalance = {
          balance: res.data.data
        }
        commit('setModalZBalance', zBalance)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpCreateNewWalletZ ({ commit }) {
    axios
      .get('/createwalletz')
      .then((res) => {
        console.log('store create wallet Z: ', res.data.data)
        commit('setCreateNewWalletZ', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetZPrivateKey ({ commit }, payload) {
    axios
      .post('/zexportkey', {
        public_key: payload
      })
      .then((res) => {
        commit('setZPrivateKey', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetZListAddresses ({ commit }) {
    axios
      .get('/zlistaddresses')
      .then((res) => {
        commit('setZListAddresses', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpZSendMany ({ commit }, payload) {
    axios
      .post('/zsendmany', payload)
      .then((res) => {
        commit('setZOpId', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
}

const getters = {
  zPrivateKeyReceive: state => {
    return state.zPrivateKey
  },
  getZOpId: state => {
    return state.txId
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}