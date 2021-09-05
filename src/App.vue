<template>
  <v-app id="app">
    <v-main>
      <v-row no-gutters>
        <router-view />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
}
</script>
