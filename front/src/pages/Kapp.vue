<template>
  <q-page class="text-center">
    <h2> {{ title }} </h2>
    <p> Block count: {{ getInfo.blocks }} / {{ getInfo.longestchain }} </p>
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
    ...mapActions('kapp', ['httpGetInfo'])
  },
  computed: {
    ...mapState('kapp', ['getInfo'])
  },
  mounted () {
    this.httpGetInfo()
  }
}
</script>
