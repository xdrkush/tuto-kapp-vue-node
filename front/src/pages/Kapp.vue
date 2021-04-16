<template>
  <q-page class="text-center q-pa-xl">
    <h2 class="q-mt-none"> {{ title }} </h2>
    
    <!-- getInfo Component -->
    <getInfo />

    <!-- Create Wallet Component -->
    <createWallet />

    <!-- getListWallet -->
    <listWallet/>

  </q-page>
</template>

<script>
import { getInfo, createWallet, listWallet } from '../components'

export default {
  name: 'PageKapp',
  data () {
    return {
      title: 'Komodod App'
    }
  },
  components: {
    createWallet, getInfo, listWallet
  }
}
</script>
