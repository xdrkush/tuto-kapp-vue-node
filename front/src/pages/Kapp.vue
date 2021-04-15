<template>
  <q-page class="text-center q-pa-xl">
    <h2> {{ title }} </h2>
    
    <!-- getInfo Component -->
    <getInfo />

    <!-- Create Wallet Component -->
    <createWallet />

  </q-page>
</template>

<script>
import { getInfo, createWallet } from '../components'

export default {
  name: 'PageKapp',
  data () {
    return {
      title: 'Komodo App'
    }
  },
  components: {
    createWallet, getInfo
  }
}
</script>
