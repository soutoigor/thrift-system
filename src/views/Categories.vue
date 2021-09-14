<template>
  <v-row class="category" no-gutters>
    <v-col cols="12" sm="8">
      <h1 class="category__title">Categorias</h1>
    </v-col>
    <v-col cols="12" sm="4">
      <v-btn
        color="primary"
        large
        block
        @click="openModal"
      >
        Criar categoria
      </v-btn>
    </v-col>
    <v-col class="category__list" cols="12">
      <list-categories />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      width="30vw"
      @close="closeModal"
    >
      <template #title>
        Criar categoria
      </template>
      <template #content>
        <register-category @saved="closeModal" />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import ListCategories from '@/components/category/ListCategories'

export default {
  components: {
    ListCategories,
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterCategory: () => import('@/components/category/RegisterCategory'),
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
.category
  display: flex
  align-items: center

.category__title
  font-size: 4rem
  font-weight: 300

.category__list
  margin-top: 3rem
</style>
