import Vue from 'vue'

Vue.filter('trimStringBy', (string, maxLength) => {
  if (!string) return ''
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string
})
