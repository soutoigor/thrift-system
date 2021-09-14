<template>
  <v-app id="app">
    <app-header v-if="isActualPageInsideApp" />
    <v-main>
      <v-row
        no-gutters
        :class="{ app__main: isActualPageInsideApp }"
      >
        <router-view />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppHeader: () => import('@/components/common/AppHeader'),
  },
  computed: {
    isActualPageInsideApp() {
      return this.$route.meta.requiresAuth
    },
  },
}
</script>

<style lang="sass" scoped>
.app__main
  padding: 2rem
</style>
