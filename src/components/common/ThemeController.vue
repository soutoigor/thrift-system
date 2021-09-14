<template>
  <v-switch
    color="accent"
    hide-details
    :prepend-icon="prependIcon"
    :input-value="isDarkMode"
    @change="changeTheme"
    @click:prepend="changeTheme(!isDarkMode)"
  />
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.dark
    },
    prependIcon() {
      return this.isDarkMode
        ? 'mdi-moon-waning-crescent'
        : 'mdi-white-balance-sunny'
    },
  },
  created() {
    this.handleSavedTheme()
  },
  methods: {
    changeTheme(value) {
      this.$vuetify.theme.dark = value
      localStorage.setItem('dark', `${value}`)
    },
    handleSavedTheme() {
      const theme = localStorage.getItem('dark')
      this.changeTheme(theme === 'true')
    },
  },
}
</script>
