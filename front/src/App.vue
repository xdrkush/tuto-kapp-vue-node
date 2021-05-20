<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('all', ['httpGetChainAvailable'])
  },
  mounted () {
    this.httpGetChainAvailable()    
  }
}
</script>
