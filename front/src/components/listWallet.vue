<template>
  <div class='q-mt-md'>
    <q-table
      class='my-sticky-virtscroll-table'
      virtual-scroll
      :rows-per-page-options='[0]'
      :virtual-scroll-sticky-size-start='48'
      row-key='address'
      title='List Wallet'
      :data='this.listWallet'
      :columns='columns'
    >
      <template v-slot:body='props'>
        <q-tr :props='props'>
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
              size='sm'
              color='primary'
              round
              dense
              @click='openModal(props.row)'
              icon='visibility'
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model='medium' persistent>
      <q-card class='text-center' style='width: 700px; max-width: 80vw'>
        <q-card-section class='row bg-primary text-white'>
          <div class='text-h6 q-mt-none col-6'>Account: {{ modal.account }}</div>
          <div class='text-h6 q-mt-none col-6'>Balance: {{ modal.amount }}</div>
        </q-card-section>

        <q-tabs
          v-model='tab'
          dense
          class='text-grey'
          active-color='primary'
          indicator-color='primary'
          align='justify'
          narrow-indicator
        >
          <q-tab name='info' label='Infos' />
          <q-tab name='private' label='Private' />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model='tab' animated>
          <q-tab-panel name='info'>
            <q-card-section class='q-pt-none'>
              <p><strong>Address_public:</strong> {{ modal.address_pub }}</p>
              <p>
                <strong>Rawconfirmations:</strong> {{ modal.rawconfirmations }}
              </p>
              <p><strong>Confirmations:</strong> {{ modal.confirmations }}</p>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name='private'>
            <q-card-section class='q-pt-none'>
              <q-btn rounded class='text-primary' label='Get Private Key' @click='getPrivateKey(modal.address_pub)'/>
              <p class="text-primary q-mt-md"><strong>{{ privateKeyRecieve.private_key }}</strong></p>
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions align='right' class='bg-white text-teal'>
          <q-btn flat label='OK' v-close-popup @click='closeModal()' />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ListWallet',
  data() {
    return {
      medium: false,
      modal: {
        account: '',
        address_pub: '',
        addres_priv: '',
        amount: '',
      },
      tab: 'info',
      columns: [
        {
          name: 'account',
          required: true,
          label: 'Account',
          align: 'left',
          field: (row) => row.account,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'address',
          label: 'Address',
          align: 'left',
          field: 'address',
          sortable: true,
        },
        {
          name: 'rawconfirmations',
          align: 'left',
          label: 'rawconfirmations',
          field: 'rawconfirmations',
          sortable: true,
        },
        {
          name: 'confirmations',
          align: 'left',
          label: 'confirmations',
          field: 'confirmations',
          sortable: true,
        },
        {
          name: 'amount',
          align: 'left',
          label: 'Amount',
          field: 'amount',
          sortable: true,
        },
        {
          name: 'action',
          align: 'left',
          label: 'Action',
        },
      ],
    };
  },
  methods: {
    openModal(data) {
      this.medium = true;
      this.modal.account = data.account;
      this.modal.address_pub = data.address;
      this.modal.amount = data.amount;
    },
    closeModal() {
      this.medium = false;
      this.modal.account = '';
      this.modal.address_pub = '';
      this.modal.amount = '';
      this.setPrivateKey('')
    },
    getPrivateKey(publickey) {
      this.httpGetPrivateKey(publickey);
    },
    ...mapActions('kapp', ['httpGetListWallet', 'httpGetPrivateKey']),
    ...mapMutations('kapp', ['setPrivateKey'])
  },
  computed: {
    ...mapState('kapp', ['listWallet', 'privateKey']),
    ...mapGetters('kapp', ['privateKeyRecieve'])
  },
  mounted() {
    this.httpGetListWallet()
  }
};
</script>
