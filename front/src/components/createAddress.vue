<template>
  <div class="q-mt-md">
    <q-btn color="accent" text-color="secondary" glossy label="Create new address" @click="newWallet()"/>
    <q-list bordered separator class="q-mt-md text-white">

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Public adress:</q-item-label>
          <q-item-label>
            <p>{{ walletCreated.public_key }} </p>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Private adress:</q-item-label>
          <q-item-label>
            <p>{{ walletCreated.private_key }} </p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CreateWallet",
  methods: {
    newWallet () {
      console.log('create wallet')
      this.httpCreateNewWallet()
    },
    ...mapActions("kapp", ["httpCreateNewWallet"])
  },
  computed: {
    ...mapState("kapp", ["walletCreated"])
  }
};
</script>
