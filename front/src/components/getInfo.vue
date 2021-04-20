<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="~assets/licorn.jpeg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Blockchain {{ getInfo.name }}</q-item-label>
          <q-item-label caption>
            <p>Block count: {{ getInfo.blocks }} / {{ getInfo.longestchain }}</p>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-6">
          <p>Difficulty: {{ getInfo.difficulty }}</p>
          <p>P2P_Port: {{ getInfo.p2pport }}</p>
          <p>RPC_Port: {{ getInfo.rpcport }}</p>

        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-6">
          <p>Wallet Balance: {{ getInfo.balance }} {{ getInfo.name }}</p>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'GetInfo',
  methods: {
    ...mapActions('kapp', ['httpGetInfo'])
  },
  computed: {
    ...mapState('kapp', ['getInfo'])
  },
  mounted () {
    this.httpGetInfo()
  }
}
</script>
