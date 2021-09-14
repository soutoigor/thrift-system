<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        label="Buscar categoria"
        outlined
        clearable
        @input="setFilter"
      />
    </v-col>
    <v-col
      v-if="isLoading"
      class="categories__loading"
      cols="12"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
    </v-col>
    <v-col v-else cols="12">
      <v-row>
        <template v-if="hasCategories">
          <v-col
            v-for="category of categories"
            :key="category.id"
            cols="12"
            md="3"
          >
            <item-category :category="category" />
          </v-col>
        </template>
        <v-col
          v-else
          cols="12"
          class="categories__empty"
        >
          Não há categorias.
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemCategory from '@/components/category/ItemCategory'

export default {
  components: {
    ItemCategory,
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories',
      isLoading: 'category/isLoading',
    }),
    hasCategories() {
      return this.categories.length > 0
    },
  },
  created() {
    this.listCategory()
  },
  methods: {
    ...mapActions({
      listCategory: 'category/listCategory',
      setFilter: 'category/setFilter',
    }),
  },
}
</script>

<style lang="sass" scoped>
.categories__loading
  display: flex
  justify-content: center

.categories__empty
  font-size: 3rem
  text-align: center
</style>
