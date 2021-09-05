<template>
  <div>
    <h1>Home</h1>
    <h2>Olá, {{ userName }}</h2>
    <v-btn
      @click="logoutUser"
    >
      logout
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      userName: 'auth/userName',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    logoutUser() {
      this.logout()
      this.$router.push('/login')
    },
  },
}
</script>
