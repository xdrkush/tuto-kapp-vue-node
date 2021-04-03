import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default ({ Vue }) => {
    axios.defaults.baseURL = 'http://127.0.0.1:7777/api'
    // axios.defaults.baseURL = 'https://hsuk.tk/api'
    axios.defaults.withCredentials = true
    Vue.prototype.$axios = axios
}