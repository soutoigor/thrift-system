<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Nome da categoria"
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
          :disabled="!name"
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
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    name: null,
  }),
  computed: {
    ...mapGetters({
      isLoading: 'category/isLoading',
    }),
    hasCategory() {
      return !!this.category.id
    },
    buttonTitle() {
      return this.hasCategory ? 'Editar' : 'Criar'
    },
  },
  created() {
    if (this.hasCategory) {
      this.prepareToEdit()
    }
  },
  methods: {
    ...mapActions({
      createCategory: 'category/createCategory',
      updateCategory: 'category/updateCategory',
      listCategory: 'category/listCategory',
    }),
    prepareToEdit() {
      this.setName(this.category.name)
    },
    setName(value) {
      this.name = value
    },
    async handleSubmit() {
      const attributes = { name: this.name }
      if (this.hasCategory) {
        await this.updateCategory({
          id: this.category.id,
          attributes,
        })
      } else {
        await this.createCategory(attributes)
      }
      this.listCategory()
      this.setName(null)
      this.$emit('saved')
    },
  },
}
</script>
