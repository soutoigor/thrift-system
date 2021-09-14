<template>
  <v-snackbar
    :value="show"
    :timeout="-1"
    :color="status"
    top
  >
    <slot />
    <template #action="{ attrs }">
      <v-btn
        icon
        dark
        v-bind="attrs"
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
const SNACKBAR_TIMEOUT = 5000

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  watch: {
    show(value) {
      if (value) {
        setTimeout(this.close, SNACKBAR_TIMEOUT)
      }
    },
  },
}
</script>
