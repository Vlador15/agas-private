<template>
  <v-container v-if="isAuthenticated" class="container" py-3 px-6>
    <v-tabs
      v-model="tab"
      background-color="#E3F2FD"
      corol="primary"
      left
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">{{ $t('barting.history') }}</v-tab>

      <v-tab href="#tab-2"> {{ $t('barting.transfers') }} </v-tab>
      <v-tab href="#tab-3"> {{ $t('barting.bank') }}</v-tab>
    </v-tabs>
    <v-tabs-items v-if="userCredentials" v-model="tab">
      <v-tab-item value="tab-1">
        <v-row class="justify-center align-center">
          <v-col cols="12" sm="12">
            <bartingHistory :userCredentials="userCredentials" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <template v-if="skeleton">
              <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
                <AppScreamContentLoader></AppScreamContentLoader>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-row class="c-row justify-left align-left">
          <bartingNewTransactionForm
            :userCredentials="userCredentials"
            :errors="errors"
          />
        </v-row>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <v-row class="c-row justify-left align-left">
          <bartingBank :userCredentials="userCredentials" :errors="errors" />
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
// COMPONENTS
// import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'

// VUEX
import bartingBank from '@/components/barting/Bank'
import bartingHistory from '@/components/barting/History'
import bartingNewTransactionForm from '@/components/barting/NewTransactionForm'
import { mapGetters, mapState } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    bartingHistory,
    bartingBank,
    bartingNewTransactionForm
  },
  data() {
    return {
      tab: null,
      skeleton: false,
      selectedCat: null,
      selectedSubCat: null
    }
  },
  // components: {
  //   AppScreamContentLoader,
  //   NewTransactionForm: () => import('@/components/barting/NewTransactionForm.vue'),
  //   Bank: () => import('@/components/barting/Bank.vue'),
  //   History: () => import('@/components/barting/History.vue')
  // },
  computed: {
    ...mapState(['store', 'status']),
    ...mapGetters(['userCredentials', 'isAuthenticated', 'errors'])
  },
  beforeCreate() {
    this.$store.dispatch('FETCH_AUTH_USER')
  }
}
</script>
<style lang="scss" scoped>
.theme--light.v-tabs-items {
  background-color: #e3f2fd !important;
}
.container {
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  width: 59%;
}
.c-row {
  margin: 0px;
}
.v-tab {
  cursor: pointer;
}
</style>
