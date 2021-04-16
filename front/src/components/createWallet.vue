<template>
  <div class="q-mt-md">
    <q-btn color="secondary" glossy label="Create new wallet" @click="newWallet()"/>
    <q-list bordered separator class="q-mt-md">

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Public adress:</q-item-label>
          <q-item-label>
            <p>{{ walletCreated.public_key }} </p>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>Private adress:</q-item-label>
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
