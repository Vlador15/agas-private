<template>
  <section>
    <v-text-field
      v-model="modelObject.title"
      :label="$t('pets_title')"
      outlined
      dense
    ></v-text-field>
    <v-textarea
      v-model="modelObject.description"
      outlined
      rows="1"
      :label="$t('description')"
    ></v-textarea>
    <v-text-field
      v-model="modelObject.phone"
      :label="$t('phone_num')"
      outlined
      dense
    ></v-text-field>
    <v-textarea
      v-model="modelObject.delivery"
      outlined
      rows="1"
      :label="$t('delivery_conditions')"
    ></v-textarea>
    <v-switch
      v-model="modelObject.allow_comments"
      :label="$t('allow_comments')"
      color="primary"
      hide-details
    ></v-switch>
  </section>
</template>

<script>
export default {
  name: 'PostAdditionalFields',
  props: {
    modelObject: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    if (
      this.$store.getters.userCredentials &&
      this.$store.getters.userCredentials.phone
    ) {
      this.modelObject.phone = this.$store.getters.userCredentials.phone
    }
  }
}
</script>
