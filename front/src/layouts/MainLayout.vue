<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar vs KApp
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-secondary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-white"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          class="text-white"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-dark text-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    caption: 'Homepage',
    icon: 'home',
    link: ''
  },
  {
    title: 'KApp',
    caption: 'Komodo App',
    icon: 'security',
    link: '#/kapp'
  },
  {
    title: 'Github',
    caption: 'tuto-kapp-vue-node',
    icon: 'school',
    link: 'https://github.com/xdrkush/tuto-kapp-vue-node'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
