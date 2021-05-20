<template>
  <q-page class="text-center q-pa-xl">
    <h2 class="q-mt-none"><strong>{{ title }}</strong></h2>

    <!-- Choose Chain -->
    <div class="q-mb-xl">
      <q-form @submit="onSubmitRunChain">
        <q-select
          dark
          class="text-white q-mb-xl"
          v-model="chain"
          :options="assetChain"
          label="Choose Asset-Chain"
        />
        <div class="row">
          <div class="col-6 text-center">
            <q-toggle v-model="accept" color='accent' label="I accept the license and terms" />
          </div>
          <div class="col-6">
            <q-btn label="Choose" type="submit" text-color="secondary" color="accent" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "PageKapp",
  data() {
    return {
      title: "Run Chain",
      chain: null,
      accept: false,
      assetChain: [
          "KOMODO", "AXO", "BET", "BOTS", "BTCH", "CCL", "COQUICASH", "CRYPTO", "DEX", "GLEEC",
          "HODL", "ILN", "JUMBLR", "KOIN", "MESH", "MGW", "MORTY", "MSHARK", "NINJA",
          "OOT", "PANGEA", "PIRATE", "REVS", "RICK", "SUPERNET", "THC", "WLC21", "ZILLA"
        ]
    };
  },
  methods: {
    onSubmitRunChain () {
      this.chain = { choose: this.chain }
      this.httpRunChain(this.chain)
    },
    ...mapActions('kapp', ['httpChooseChain', 'httpRunChain']),
    ...mapActions('all', ['httpRunChain'])
  },
  computed: {
    ...mapGetters('all', ['getChainAvailable'])
  }
};
</script>
