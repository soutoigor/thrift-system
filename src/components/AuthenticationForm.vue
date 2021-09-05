<template>
  <v-form @submit.prevent="handleFormSubmit">
    <v-row no-gutters>
      <v-col cols="12" tag="h2" class="form__title">
        {{ formTitle }}
      </v-col>
      <v-col v-if="!isLogin" cols="12">
        <v-text-field
          v-model="name"
          label="Nome do brechó"
          outlined
          :error="$v.name.$error"
          :error-messages="nameErrors"
          @blur="$v.name.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          label="E-mail"
          outlined
          :error="$v.email.$error"
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password"
          label="Senha"
          outlined
          :type="passwordOptions.type"
          :append-icon="passwordOptions.icon"
          :error="$v.password.$error"
          :error-messages="passwordErrors"
          @blur="$v.password.$touch()"
          @click:append="toggleIsShowingPassword"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          x-large
          :loading="isLoading"
        >
          {{ submitButtonText }}
        </v-btn>
      </v-col>
      <v-col cols="12" class="form__redirect-text">
        {{ formRedirectText }}
      </v-col>
      <v-col cols="12">
        <v-btn
          color="primary"
          text
          block
          x-large
          :to="redirectButton.url"
        >
          {{ redirectButton.text }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  required,
  requiredIf,
  email,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      isShowingPassword: false,
    }
  },
  validations() {
    return {
      name: { required: requiredIf(() => !this.isLogin), minLength: minLength(2) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'auth/isLoading',
    }),
    formTitle() {
      return this.isLogin ? 'Login' : 'Cadastre-se'
    },
    formRedirectText() {
      return this.isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'
    },
    submitButtonText() {
      return this.isLogin ? 'Entrar' : 'Criar conta'
    },
    redirectButton() {
      return this.isLogin ? { text: 'Cadastre-se', url: '/create-account' } : { text: 'Fazer login', url: '/login' }
    },
    passwordOptions() {
      return this.isShowingPassword
        ? { icon: 'mdi-eye', type: 'text' }
        : { icon: 'mdi-eye-off', type: 'password' }
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      if (!this.$v.name.required) errors.push('Preencha o nome')
      if (!this.$v.name.minLength) errors.push('Mínimo 2 caracteres')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      if (!this.$v.email.required) errors.push('Preencha o E-mail')
      if (!this.$v.email.email) errors.push('E-mail inválido')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) errors.push('Preencha a senha')
      if (!this.$v.password.minLength) errors.push('Mínimo 6 caracteres')
      return errors
    },
  },
  methods: {
    ...mapActions({
      createAccount: 'auth/createAccount',
      login: 'auth/login',
      setToken: 'auth/setToken',
      getUser: 'auth/getUser',
      setUser: 'auth/setUser',
    }),
    async handleLogin(credentials) {
      const { data: { token } } = await this.login(credentials)
      this.setToken(token)
    },
    toggleIsShowingPassword() {
      this.isShowingPassword = !this.isShowingPassword
    },
    emitError(error) {
      const errorMessage = error?.response?.data?.message?.[0].message

      const message = errorMessage === 'unique validation failed on email'
        ? 'E-mail já existente, tente outro ou faça login'
        : 'E-mail ou senha inválidos'

      this.$emit('error', message)
    },
    redirectToHome() {
      this.$router.push('/')
    },
    async handleFormSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const credentials = { email: this.email, password: this.password }
      try {
        if (!this.isLogin) {
          await this.createAccount({ ...credentials, name: this.name })
        }
        await this.handleLogin(credentials)
        const { data: user } = await this.getUser()
        this.setUser(user)
        this.redirectToHome()
      } catch (error) {
        this.emitError(error)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.form__title
  font-size: 1.5rem
  font-weight: 700
  text-align: center
  margin: 2rem 0

.form__redirect-text
  font-size: 1.6rem
  font-weight: 400
  text-align: center
  margin: 3rem 0 1rem 0
</style>
