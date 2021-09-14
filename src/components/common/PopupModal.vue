<template>
  <v-dialog
    :value="open"
    :width="modalWidth"
    @click:outside="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card>
      <v-card-title class="card__title">
        <slot name="title" />
        <v-spacer />
        <v-btn
          fab
          icon
          @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '1000',
    },
  },
  computed: {
    modalWidth() {
      return this.$vuetify.breakpoint.xs ? '100vw' : this.width
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="sass" scoped>
.card__title
  font-size: 1.5rem !important
</style>
