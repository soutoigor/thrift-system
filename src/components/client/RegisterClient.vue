<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Nome"
          autocomplete="off"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="contact"
          label="Contato"
          autocomplete="off"
          hint="E-mail, telefone, Instagram, etc"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="address"
          label="Endereço"
          autocomplete="off"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          large
          :loading="isLoading"
          :disabled="!hasFilledFields"
        >
          {{ buttonTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    client: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    name: null,
    contact: null,
    address: null,
  }),
  computed: {
    ...mapGetters({
      isLoading: 'client/isLoading',
    }),
    hasFilledFields() {
      return !!this.name && !!this.contact && !!this.address
    },
    hasClient() {
      return !!this.client.id
    },
    buttonTitle() {
      return this.hasClient ? 'Editar' : 'Criar'
    },
  },
  created() {
    if (this.hasClient) {
      this.setClient(this.client)
    }
  },
  methods: {
    ...mapActions({
      createClient: 'client/createClient',
      updateClient: 'client/updateClient',
      listClient: 'client/listClient',
    }),
    setClient({ name, address, contact }) {
      this.name = name
      this.address = address
      this.contact = contact
    },
    async handleSubmit() {
      const attributes = {
        name: this.name,
        contact: this.contact,
        address: this.address,
      }
      if (this.hasClient) {
        await this.updateClient({
          id: this.client.id,
          attributes,
        })
      } else {
        await this.createClient(attributes)
      }
      this.listClient()
      this.setClient({})
      this.$emit('saved')
    },
  },
}
</script>
