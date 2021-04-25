<template>
  <q-page class="text-center q-pa-xl">
    <h2 class="q-mt-none">{{ title }}</h2>

    <!-- Choose Chain -->
    <div class="q-mb-xl">
      <q-form @submit="onSubmitSetChain">
        <q-select
          standout="bg-primary text-white q-mb-xl"
          v-model="chain"
          :options="options"
          label="Choose Asset-Chain"
        />
        <div class="row">
          <div class="col-6 text-center">
            <q-toggle v-model="accept" label="I accept the license and terms" />
          </div>
          <div class="col-6">
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </div>
      </q-form>
    </div>

    <h3>{{ getInfo.name }}</h3>

    <!-- getInfo Component -->
    <getInfo />

    <!-- this modulation is in progress ;) -->
    <!-- Create Wallet Component -->
    <createWallet v-if="getInfo.name === 'MORTY'"/>
    <createWallet v-if="getInfo.name === 'KMD'"/>
    <!-- Create WalletZ Component -->
    <createWalletZ v-if="getInfo.name === 'PIRATE'" />

    <!-- getListWallet -->
    <listWallet v-if="getInfo.name === 'MORTY'" />
    <listWallet v-if="getInfo.name === 'KMD'" />
    <!-- getListWalletZ -->
    <listWalletZ  v-if="getInfo.name === 'PIRATE'" />

    <!-- getMining Info -->
    <mining />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getInfo, createWallet, createWalletZ, listWallet, mining, listWalletZ } from "../components";

export default {
  name: "PageKapp",
  data() {
    return {
      title: "Komodod App",
      chain: null,
      accept: false,
      options: ["KOMODO", "MORTY", "PIRATE"],
    };
  },
  components: {
    createWallet,
    createWalletZ,
    getInfo,
    listWallet,
    mining,
    listWalletZ
  },
  methods: {
    onSubmitSetChain () {
      this.httpChooseChain(this.chain)
      this.$router.go(0)
    },
    ...mapActions('kapp', ['httpChooseChain'])
  },
  computed: {
    ...mapState('kapp', ['getInfo'])
  }
};
</script>
