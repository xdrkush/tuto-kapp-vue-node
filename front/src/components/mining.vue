<template>
  <div class="q-mt-md">
    <h6 class="texh-h6"><u>Mining:</u></h6>
    <q-card class="my-card bg-secondary" flat bordered dark>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="~assets/licorn.jpeg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label><strong>Mining Info</strong></q-item-label>
          <q-item-label>
            <p>Chain: {{ miningInfo.chain }} / Blocks: {{ miningInfo.blocks }} / Difficulty: {{ miningInfo.difficulty }} 
               / Current_Block_size: {{ miningInfo.currentblocksize }} (number_tx: {{ miningInfo.currentblocktx }})</p>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-6">
          <p>Testnet: {{ miningInfo.testnet }}</p>
          <p>Generate: {{ miningInfo.generate }}</p>
          <p>Staking: {{ miningInfo.staking }}</p>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-6">
          <p>Networkhashps: {{ miningInfo.networkhashps }}</p>
          <p>Local_solps: {{ miningInfo.localsolps }}</p>
          <p>Num_threads: {{ miningInfo.numthreads }}</p>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'GetMiningInfo',
  methods: {
    ...mapActions('kapp', ['httpMiningInfo'])
  },
  computed: {
    ...mapState('kapp', ['miningInfo'])
  },
  mounted () {
    this.httpMiningInfo()
  }
}
</script>
