<template>
  <v-breadcrumbs :items="links">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        nuxt
        :to="item.to"
        :disabled="item.disabled"
        :exact="item.exact"
      >
        {{ item.name.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    links() {
      let startEl = 2
      this.$i18n.locale === 'he' ? (startEl = 1) : (startEl = 2)
      let endEl = -1
      const path = this.$route.fullPath
      const pathItems = path.split('/')

      if (pathItems[pathItems.length - 1] === 'edit') {
        endEl = -2
      }
      const links = []
      let pathW = ''
      pathItems.slice(startEl, endEl).forEach(el => {
        pathW += `/${el}`
        if (el === 'edit') {
          return null
        }
        const link = {
          name: this.$t(`breadcrumbs.${el}`),
          to: this.localePath(pathW),
          disabled: false,
          exact: true
        }
        links.push(link)
      })
      return links
    }
  }
}
</script>

<style lang="scss" scoped></style>
