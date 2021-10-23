<template>
  <v-row class="client" no-gutters>
    <v-col cols="12" sm="8">
      <h1 class="client__title">Clientes</h1>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        color="primary"
        large
        block
        @click="openModal"
      >
        Criar cliente
      </v-btn>
    </v-col>
    <v-col class="client__list" cols="12">
      <list-clients />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      width="30vw"
      @close="closeModal"
    >
      <template #title>
        Criar cliente
      </template>
      <template #content>
        <register-client @saved="closeModal" />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import ListClients from '@/components/client/ListClients'

export default {
  components: {
    ListClients,
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterClient: () => import('@/components/client/RegisterClient'),
  },
  data: () => ({
    isDialogOpen: false,
  }),
  methods: {
    openModal() {
      this.isDialogOpen = true
    },
    closeModal() {
      this.isDialogOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
.client
  display: flex
  align-items: center

.client__title
  font-size: 4rem
  font-weight: 300

.client__list
  margin-top: 3rem
</style>
