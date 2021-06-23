<template>
  <v-card color="purple accent-1" class="mb-5" elevation="0">
    <v-card-text class="pb-0 text-right advertising">Advertising</v-card-text>
    <v-card-title class="text-h4 pt-0 mt-n3">Title</v-card-title>
    <v-card-text class="headline font-weight-bold">
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras enim
      sapien, feugiat non euismod ut, cursus id nulla. In vel fringilla tellus.
      In lobortis porttitor orci vel cursus. Vivamus feugiat."
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <img :src="require('~/assets/no_img.png')" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Company name</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn color="primary" rounded>Visit Link</v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.v-application--is-rtl .advertising {
  text-align: left !important;
}
</style>
