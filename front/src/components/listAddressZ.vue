<template>
<!-- 
  I must clean the page when I modulate
-->
  <div class="q-mt-md">
    <q-table
      class="my-sticky-virtscroll-table text-white bg-secondary"
      virtual-scroll
      dark
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="address"
      title="List Address Z (amount is not balance)"
      :data="this.zListAddresses"
      :columns="columns"
    >

      <template v-slot:top-right>
        <p>Wallet: {{ listZWalletLength }}</p>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          
          <q-td auto>
            <p><strong>{{ props.row.address }}</strong></p>
          </q-td>

          <q-td auto-width>
            <q-btn
              size="sm"
              text-color='secondary'
              color="accent"
              round
              dense
              @click="openModal(props.row)"
              icon="visibility"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="medium" persistent>
      <q-card
        class="text-center bg-secondary text-white"
        style="width: 700px; max-width: 80vw; min-height: 65vh"
      >
        <q-card-section class="row bg-primary text-white">
          <div class="text-h6 q-mt-none col-6">
            Account: {{ modal.account }}
          </div>
          <div class="text-h6 q-mt-none col-6">Balance: {{ modalZBalance.balance }}</div>
        </q-card-section>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="info" label="Infos" />
          <q-tab name="tx" label="Tx" />
          <q-tab name="private" label="Private" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info" class="q-pa-none bg-secondary">
            <q-card-section class="row bg-primary text-white q-pt-xs q-pt-xs">
              <q-item
                clickable
                tag="a"
                target="blank"
                class="col-12"
                :href="'https://kmdexplorer.io/address/' + modal.address_pub"
              >
                <q-item-section>
                  <p class="q-my-none">
                    Public_key: {{ modal.address_pub }}
                  </p>
                </q-item-section>
              </q-item>

              <p class="q-my-none col-6">
                rawconfirmations: {{ modal.rawconfirmations }}
              </p>
              <p class="q-my-none col-6">
                confirmations: {{ modal.confirmations }}
              </p>
            </q-card-section>

            <q-card-section>
              <q-form @submit="onSubmitSetAccount" @reset="onReset">
                <q-input
                  filled
                  dark
                  v-model="setAccount.account"
                  label="Edit name of account:"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <div class="row">
                  <div class="col-6 text-center">
                    <q-toggle
                      color='accent'
                      v-model="accept"
                      label="I accept the license and terms"
                    />
                  </div>
                  <div class="col-6">
                    <q-btn label="Submit" type="submit" text-color='secondary' color="accent"/>
                    <q-btn
                      label="Reset"
                      type="reset"
                      text-color='accent'
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </div>
              </q-form>
            </q-card-section>

            <q-card-section>
              <p class="text-h6 text-primary"><u>History list tx:</u></p>
              <q-list bordered>
                <q-item
                  clickable
                  tag="a"
                  target="blank"
                  :href="'https://explorer.pirate.black/tx/' + tx"
                  v-ripple
                  :key="tx"
                  v-for="tx in modal.txIds"
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="help" />
                  </q-item-section>

                  <q-item-section>{{ tx }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="tx" class="border-bottom bg-secondary">
            <q-card-section class="q-pt-none">
              <q-form @submit="onSubmitTx" @reset="onReset" class="q-gutter-md">
                <q-input
                  filled
                  dark
                  disable
                  v-model="modal.address_pub"
                  label="From:"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  filled
                  dark
                  v-model="tx.to"
                  label="To:"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  filled
                  dark
                  type="number"
                  v-model="tx.amount"
                  label="Amount:"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Please type your age',
                    (val) => (val > 0 && val < 100) || 'Please type a real age',
                  ]"
                  step="0.001"
                />
                <q-toggle
                  v-model="accept"
                  color="accent"
                  label="I accept the license and terms"
                />
                <div>
                    <q-btn label="Submit" type="submit" text-color='secondary' color="accent"/>
                    <q-btn
                      label="Reset"
                      type="reset"
                      text-color='accent'
                      flat
                      class="q-ml-sm"
                    />
                </div>
              </q-form>
            </q-card-section>

            <q-card-section class="q-pt-none" v-if="getTxId.txId">
              <p class="text-primary q-mt-md">
                <strong><u>Tx_id:</u> {{ getTxId.txId }}</strong>
              </p>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="private" class="bg-secondary">
            <q-card-section class="q-pt-none">
              <q-btn
                rounded
                color='accent'
                text-color='secondary'
                label="Get Private Key"
                @click="getZPrivateKey(modal.address_pub)"
              />
              <p class="text-white q-mt-md" style="max-width: 100%">
                <strong>{{ zPrivateKeyReceive.private_key }}</strong>
              </p>
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions align="center">
          <q-btn flat label="Close" class="bg-accent" color="secondary" v-close-popup @click="closeModal()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "ListWallet",
  data() {
    return {
      medium: false,
      accept: false,
      modal: {
        account: "",
        address_pub: "",
        addres_priv: "",
        amount: "",
        rawconfirmations: "",
        confirmations: "",
        txIds: "",
      },
      tx: {
        to: "",
        amount: "",
      },
      setAccount: {
        account: "",
      },
      tab: "info",
      columns: [
        {
          name: "address",
          required: true,
          label: "Address",
          align: "center",
          field: (row) => row.address,  
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "action",
          align: "right",
          label: "Action",
        },
      ],
    };
  },
  methods: {
    openModal(data) {
      console.log(data);
      this.medium = true;
      this.modal.account = data.account;
      this.modal.address_pub = data.address;
      // this.modal.amount = data.amount;
      this.modal.rawconfirmations = data.rawconfirmations;
      this.modal.confirmations = data.confirmations;
      this.modal.txIds = data.txids;
      this.httpGetZBalance({address: data.address})
    },
    closeModal() {
      this.medium = false;
      this.modal.account = "";
      this.modal.address_pub = "";
      this.modal.amount = "";
      this.tx.to = "";
      this.tx.mount = "";
      this.tx.accept = false;
      this.setZPrivateKey("");
      this.setZOpId({});
      this.setModalBalance({});
    },
    getZPrivateKey(publickey) {
      this.httpGetZPrivateKey(publickey);
    },
    onSubmitTx() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        const form = {
          addr_from: this.modal.address_pub,
          addr_to: this.tx.to,
          amount: this.tx.amount,
        };
        this.$q.notify({
          color: "primary",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        this.httpZSendMany(form);
      }
    },
    onSubmitSetAccount() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        const form = {
          address_pub: this.modal.address_pub,
          account: this.setAccount.account,
        };
        this.$q.notify({
          color: "primary",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        this.httpSetAccount(form);
      }
    },
    onReset() {
      this.tx.amount = null;
      this.tx.from = null;
      this.tx.to = null;
      this.accept = false;
    },
    // ...mapActions("kapp", [
    //   "httpGetListWallet",
    //   "httpGetPrivateKey",
    //   "httpSendFromTx",
    //   "httpSetAccount",
    //   "httpGetBalance"
    // ]),
    ...mapActions("zapp", [
      "httpGetZListAddresses",
      "httpGetZBalance",
      "httpGetZPrivateKey",
      "httpZSendMany"
    ]),
    ...mapMutations("kapp", ["setPrivateKey", "setTxId", "setModalBalance"]),
  },
  computed: {
    listZWalletLength: function () {
      return this.zListAddresses.length;
    },
    ...mapState("kapp", ["listWallet", "privateKey", "txId", "modalBalance"]),
    ...mapState("zapp", ["zListAddresses", "modalZBalance", "zPrivateKey"]),
    ...mapGetters("kapp", ["privateKeyRecieve", "getTxId"]),
    ...mapGetters("zapp", ["zPrivateKeyReceive", "getZOpId"]),
  },
  mounted() {
    this.httpGetZListAddresses();
  },
};
</script>
