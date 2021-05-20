<template>
  <q-page class="text-center q-pa-xl">
    <h2 class="q-mt-none"><strong>{{ title }}</strong></h2>

    <!-- Choose Chain -->
    <div class="q-mb-xl">
      <q-form @submit="onSubmitSetChain">
        <q-select
          dark
          class="text-white q-mb-xl"
          v-model="chain"
          :options="getChainAvailable"
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

    <h3><strong><u>{{ getInfo.name }}</u></strong></h3>

    <!-- getInfo Component -->
    <getInfo />

    <!-- this modulation is in progress ;) -->
    <!-- Create Address Component -->
    <createAddress v-if="getInfo.name === 'MORTY'"/>
    <createAddress v-if="getInfo.name === 'KMD'"/>
    <!-- Create AddressZ Component -->
    <createAddressZ v-if="getInfo.name === 'PIRATE'" />

    <!-- getListAddress -->
    <listAddress v-if="getInfo.name === 'MORTY'" />
    <listAddress v-if="getInfo.name === 'KMD'" />
    <!-- getListAddressZ -->
    <listAddressZ  v-if="getInfo.name === 'PIRATE'" />

    <!-- getMining Info -->
    <mining />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getInfo, createAddress, createAddressZ, listAddress, mining, listAddressZ } from "../components";

export default {
  name: "PageKapp",
  data() {
    return {
      title: "Komodod App",
      chain: null,
      accept: false
    };
  },
  components: {
    createAddress,
    createAddressZ,
    getInfo,
    listAddress,
    mining,
    listAddressZ
  },
  methods: {
    onSubmitSetChain () {
      this.chain = { choose: this.chain }
      this.httpChooseChain(this.chain)
      this.$router.go(0)
    },
    ...mapActions('kapp', ['httpChooseChain'])
  },
  computed: {
    ...mapState('kapp', ['getInfo']),
    ...mapGetters('all', ['getChainAvailable'])
  }
};
</script>
