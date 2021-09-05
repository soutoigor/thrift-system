<template>
  <v-row no-gutters class="authentication">
    <v-col cols="12" sm="6">
      <v-card elevation="13" class="authentication__card-form">
        <v-card-title class="authentication__header">
          <img src="@/assets/logo.png" alt="MeuBrechó logo" class="authentication__logo" />
          <h1 class="authentication__title">MeuBrechó.com</h1>
        </v-card-title>
        <v-card-text>
          <v-row class="authentication__form-container">
            <v-col cols="12" md="9" lg="6">
              <authentication-form :is-login="isLogin" @error="showError" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <snackbar-alert
      status="error"
      :show="isShowingError"
      @close="closeError"
    >
      {{ errorMessage }}
    </snackbar-alert>
  </v-row>
</template>

<script>
import AuthenticationForm from '@/components/AuthenticationForm'

export default {
  components: {
    AuthenticationForm,
    SnackbarAlert: () => import('@/components/SnackbarAlert'),
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    errorMessage: '',
    isShowingError: false,
  }),
  methods: {
    showError(error) {
      this.errorMessage = error
      this.isShowingError = true
    },
    closeError() {
      this.errorMessage = ''
      this.isShowingError = false
    },
  },
}
</script>

<style lang="sass" scoped>
.authentication
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100vw
  background: linear-gradient(90deg, #FFF 50%, rgba(255, 255, 255, 0) 50%), var(--v-secondary-base)

.authentication__card-form
  display: flex
  flex-direction: column

.authentication__header
  display: flex
  flex-direction: column
  place-items: center
  gap: .7rem

.authentication__title
  font-size: 2.3rem

.authentication__logo
  max-width: 100px

.authentication__form-container
  display: flex
  justify-content: center
</style>
