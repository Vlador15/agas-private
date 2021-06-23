import _throttle from 'lodash.throttle'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isLoadingNext: false,
      noDataToLoad: false,
      scrollListener: null
    }
  },
  computed: {
    ...mapGetters(['lastScream', 'infinitiDataToLoad'])
  },
  mounted() {
    this.scrollListener = _throttle(this.handleScroll, 1000)
    if (process.client) {
      window.addEventListener('scroll', this.scrollListener)
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_INF_DATA_TO_LOAD', true)
    this.$store.commit('RESET_LAST_SCREAM')
    if (process.client) {
      window.removeEventListener('scroll', this.scrollListener)
    }
  },
  methods: {
    handleScroll() {
      const wrapperHeight = this.$refs.infinityWrapper.offsetHeight
      const pos = window.scrollY + window.innerHeight
      if (pos > wrapperHeight - 400) {
        this.loadMore()
      }
    },
    async loadMore() {
      // if (!this.noDataToLoad) {
      //   this.isLoadingNext = true
      //   const length = await this.getNext()
      //   if (!length) {
      //     this.noDataToLoad = true
      //     // window.removeEventListener('scroll', this.scrollListener)
      //   }
      //   this.isLoadingNext = false
      // }
      if (this.infinitiDataToLoad) {
        this.isLoadingNext = true
        const length = await this.getNext()
        if (!length) {
          this.$store.commit('SET_INF_DATA_TO_LOAD', false)
          // window.removeEventListener('scroll', this.scrollListener)
        }
        this.isLoadingNext = false
      }
    }
  }
}
