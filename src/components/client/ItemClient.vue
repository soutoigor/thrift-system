<template>
  <fragment>
    <v-card v-if="$vuetify.breakpoint.xs">
      <v-card-title>
        {{ client.name | trimStringBy(25) }}
      </v-card-title>
      <v-card-text class="client">
        <v-row>
          <v-col
            cols="12"
            class="client__info"
          >
            <span class="client__info-label">Contato:</span>
            <span>{{ client.contact }}</span>
          </v-col>
          <v-col
            cols="12"
            class="client__info"
          >
            <span class="client__info-label">Endereço:</span>
            <span>{{ client.address }}</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
          @click="openEditClient"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteClient"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <fragment v-else>
      <td>{{ client.name }}</td>
      <td>{{ client.contact }}</td>
      <td>{{ client.address }}</td>
      <td>
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
          @click="openEditClient"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteClient"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </td>
    </fragment>
    <popup-modal
        :open="isDialogOpen"
        width="30vw"
        @close="closeDialog"
      >
        <template #title>
          {{ dialogTitle }}
        </template>
        <template #content>
          <register-client
            v-if="isEditing"
            :client="client"
            @saved="closeDialog"
          />
        </template>
        <template #actions>
          <v-row v-if="!isEditing" no-gutters>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                block
                @click="closeDialog"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                block
                text
                :loading="isLoading"
                @click="handleDelete"
              >
                Excluir
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </popup-modal>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Fragment,
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterClient: () => import('@/components/client/RegisterClient'),
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isDialogOpen: false,
    isEditing: false,
  }),
  computed: {
    ...mapGetters({
      isLoading: 'client/isLoading',
    }),
    dialogTitle() {
      return this.isEditing ? 'Editar cliente' : 'Certeza que deseja excluir?'
    },
  },
  methods: {
    ...mapActions({
      deleteClient: 'client/deleteClient',
      listClient: 'client/listClient',
    }),
    async handleDelete() {
      await this.deleteClient(this.client.id)
      await this.listClient()
      this.closeDialog()
    },
    setIsEditing(value) {
      this.isEditing = value
    },
    openEditClient() {
      this.setIsEditing(true)
      this.openDialog()
    },
    openDeleteClient() {
      this.setIsEditing(false)
      this.openDialog()
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
.client__info-label
  font-weight: 700

.client__info
  display: flex
  flex-direction: column

</style>
