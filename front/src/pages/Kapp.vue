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

    <!-- getInfo Component -->
    <getInfo />

    <!-- Create Wallet Component -->
    <createWallet />

    <!-- getListWallet -->
    <listWallet />

    <!-- getMining Info -->
    <mining />
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { getInfo, createWallet, listWallet, mining } from "../components";

export default {
  name: "PageKapp",
  data() {
    return {
      title: "Komodod App",
      chain: null,
      accept: false,
      options: ["KOMODO", "MORTY"],
    };
  },
  components: {
    createWallet,
    getInfo,
    listWallet,
    mining,
  },
  methods: {
    onSubmitSetChain () {
      this.httpChooseChain(this.chain)
      this.$router.go(0)
    },
    ...mapActions('kapp', ['httpChooseChain'])
  }
};
</script>
