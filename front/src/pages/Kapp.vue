<template>
  <q-page class="text-center">
    <h2> {{ title }} </h2>
    <p> Block count: {{ getBlockCount }} </p>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageKapp',
  data () {
    return {
      title: 'Komodo App'
    }
  },
  methods: {
    ...mapActions('kapp', ['httpGetBlockCount'])
  },
  computed: {
    ...mapState('kapp', ['getBlockCount'])
  },
  mounted () {
    this.httpGetBlockCount()
  }
}
</script>
