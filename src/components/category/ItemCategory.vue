<template>
  <v-card>
    <v-card-text class="category">
      <span class="category__title">{{ category.name }}</span>
      <div>
        <v-btn
          icon
          fab
          small
          dark
          color="secondary"
          @click="openEditCategory"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          fab
          small
          dark
          color="error"
          @click="openDeleteCategory"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-text>
    <popup-modal
      :open="isDialogOpen"
      width="30vw"
      @close="closeDialog"
    >
      <template #title>
        {{ dialogTitle }}
      </template>
      <template #content>
        <register-category
          v-if="isEditing"
          :category="category"
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterCategory: () => import('@/components/category/RegisterCategory'),
  },
  props: {
    category: {
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
      isLoading: 'category/isLoading',
    }),
    dialogTitle() {
      return this.isEditing ? 'Editar categoria' : 'Certeza que deseja excluir?'
    },
  },
  methods: {
    ...mapActions({
      deleteCategory: 'category/deleteCategory',
      listCategory: 'category/listCategory',
    }),
    async handleDelete() {
      await this.deleteCategory(this.category.id)
      await this.listCategory()
      this.closeDialog()
    },
    setIsEditing(value) {
      this.isEditing = value
    },
    openEditCategory() {
      this.setIsEditing(true)
      this.openDialog()
    },
    openDeleteCategory() {
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
.category
  display: flex
  justify-content: space-between
  align-items: center
  gap: 3rem

.category__title
  font-size: 1.3rem
  font-weight: 400
</style>
