<template>
  <div class="q-mt-md">
    <q-table
      class="my-sticky-virtscroll-table bg-secondary text-white"
      virtual-scroll
      dark
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="address"
      title="List Address (amount is not balance)"
      :data="this.listWallet"
      :columns="columns"
    >
      <template v-slot:top-right>
        <p>Wallet: {{ listWalletLength }}</p>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto>
            <p>{{ props.row.account }}</p>
          </q-td>
          <q-td auto>
            <p>{{ props.row.address }}</p>
          </q-td>
          <q-td auto>
            <p>{{ props.row.rawconfirmations }}</p>
          </q-td>
          <q-td auto>
            <p>{{ props.row.confirmations }}</p>
          </q-td>
          <q-td auto>
            <p>{{ props.row.amount }}</p>
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
          <div class="text-h6 q-mt-none col-6">Balance: {{ modalBalance.balance }}</div>
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

        <q-tab-panels v-model="tab" animated class="bg-secondary">
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
                  <p class="text-h6 q-my-none">
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
                  :href="'https://morty.explorer.dexstats.info/tx/' + tx"
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
                  v-model="modal.account"
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
                class="text-primary"
                label="Get Private Key"
                @click="getPrivateKey(modal.address_pub)"
              />
              <p class="text-white q-mt-md">
                <strong>{{ privateKeyRecieve.private_key }}</strong>
              </p>
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions align="center" class="bg-secondary">
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
        from: "",
        to: "",
        amount: "",
      },
      setAccount: {
        account: "",
      },
      tab: "info",
      columns: [
        {
          name: "account",
          required: true,
          label: "Account",
          align: "center",
          field: (row) => row.account,  
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "address",
          label: "Address",
          align: "center",
          field: "address",
          sortable: true,
        },
        {
          name: "rawconfirmations",
          align: "center",
          label: "rawconfirmations",
          field: "rawconfirmations",
          sortable: true,
        },
        {
          name: "confirmations",
          align: "center",
          label: "confirmations",
          field: "confirmations",
          sortable: true,
        },
        {
          name: "amount",
          align: "center",
          label: "Amount",
          field: "amount",
          sortable: true,
        },
        {
          name: "action",
          align: "center",
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
      this.httpGetBalance({address: data.address})
    },
    closeModal() {
      this.medium = false;
      this.modal.account = "";
      this.modal.address_pub = "";
      this.modal.amount = "";
      this.tx.to = "";
      this.tx.mount = "";
      this.tx.accept = false;
      this.setPrivateKey("");
      this.setTxId({});
      this.setModalBalance({});
    },
    getPrivateKey(publickey) {
      this.httpGetPrivateKey(publickey);
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
          accountFrom: this.modal.account,
          to: this.tx.to,
          amount: this.tx.amount,
        };
        this.$q.notify({
          color: "primary",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        this.httpSendFromTx(form);
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
    ...mapActions("kapp", [
      "httpGetListWallet",
      "httpGetPrivateKey",
      "httpSendFromTx",
      "httpSetAccount",
      "httpGetBalance"
    ]),
    ...mapMutations("kapp", ["setPrivateKey", "setTxId", "setModalBalance"]),
  },
  computed: {
    listWalletLength: function () {
      return this.listWallet.length;
    },
    ...mapState("kapp", ["listWallet", "privateKey", "txId", "modalBalance"]),
    ...mapGetters("kapp", ["privateKeyRecieve", "getTxId"]),
  },
  mounted() {
    this.httpGetListWallet();
    console.log(this.parseBalance)
  },
};
</script>
