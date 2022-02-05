<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        label="Buscar cliente"
        outlined
        clearable
        @input="handleFilter"
      />
    </v-col>
    <v-col
      v-if="isLoading"
      class="clients__loading"
      cols="12"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
    </v-col>
    <v-col v-else cols="12">
      <v-row v-if="hasClients">
        <v-col cols="12">
          <v-row v-if="$vuetify.breakpoint.xs">
            <v-col
              v-for="client of clients"
              :key="client.id"
              cols="12"
              md="3"
            >
              <item-client :client="client" />
            </v-col>
          </v-row>
          <v-data-table
            v-else
            hide-default-footer
            :headers="headers"
            :search="search"
            :items="clients"
          >
            <template #item="{ item }">
              <tr>
                <item-client :client="item" />
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-col
        v-else
        cols="12"
        class="clients__empty"
      >
        Não há clientes.
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemClient from '@/components/client/ItemClient'

export default {
  components: {
    ItemClient,
  },
  data: () => ({
    search: null,
    headers: [
      {
        text: 'Nome',
        value: 'name',
      },
      {
        text: 'Contato',
        value: 'contact',
        sortable: false,
      },
      {
        text: 'Endereço',
        value: 'address',
        sortable: false,
      },
      {
        text: 'Ações',
        value: '',
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      clients: 'client/clients',
      isLoading: 'client/isLoading',
    }),
    hasClients() {
      return this.clients.length > 0
    },
  },
  created() {
    this.listClient()
  },
  methods: {
    ...mapActions({
      listClient: 'client/listClient',
      setFilter: 'client/setFilter',
    }),
    handleFilter(filter) {
      this.setFilter(filter)
    },
  },
}
</script>

<style lang="sass" scoped>
.clients__loading
  display: flex
  justify-content: center

.clients__empty
  font-size: 3rem
  text-align: center
</style>
