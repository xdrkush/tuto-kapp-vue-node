import axios from 'axios'

const state = {
  getInfo: {},
  walletCreated: {},
  listWallet: [],
  privateKey: '',
  txId: {},
  miningInfo: {},
  modalBalance: {}
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
  },
  setTxId (state, value) {
    state.txId = value
  },
  setMiningInfo (state, value) {
    state.miningInfo = value
  },
  setModalBalance (state, value) {
    state.modalBalance = value
  },
}

const actions = {
  httpGetInfo ({ commit }) {
    axios
      .get('/getinfo')
      .then((res) => {
        // console.log('store kapp', res.data.data)
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
        // console.log('store kapp', res.data.data)
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
        // console.log('list wallet:', res.data.data)
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
  },
  // httpSendToTx ({ commit }, payload) {
  //   axios
  //     .post('/sendtotx', payload)
  //     .then((res) => {
  //       console.log('resSendToTx:', res.data.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       throw new Error(error);
  //     });
  // },
  httpSendFromTx ({ commit }, payload) {
    axios
      .post('/sendfromtx', payload)
      .then((res) => {
        console.log('resSendFromTx:', res.data.data)
        commit('setTxId', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpSetAccount ({ commit }, payload) {
    axios
      .post('/setaccount', payload)
      .then((res) => {
        console.log('resSetAccount:', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpMiningInfo ({ commit }, payload) {
    axios
      .get('/miningInfo')
      .then((res) => {
        console.log('resMiningInfo:', res.data.data)
        commit('setMiningInfo', res.data.data)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpGetBalance ({ commit }, payload) {
    axios
      .post('/getaddressbalance', payload)
      .then((res) => {
        console.log('resGetBalance:', res.data.data)
        const parseBalance = {
          balance: parseFloat(res.data.data.balance / 100000000), 
          recieve: parseFloat(res.data.data.recieve / 100000000)
        }
        commit('setModalBalance', parseBalance)
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  httpChooseChain ({ commit }, payload) {
    console.log(payload)
    axios
      .post('/choosechain', payload)
      .then((res) => {
        console.log('resChooseChain:', res.data)
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
  },
  getTxId: state => {
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