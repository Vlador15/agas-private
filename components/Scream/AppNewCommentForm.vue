<template>
  <v-list min-width="100%">
    <v-list-item>
      <v-list-item-avatar size="50" class="mt-4 align-self-start">
        <img
          style="object-fit: cover"
          :src="userCredentials.imageUrl"
          alt="avatar"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <v-form ref="commentform" v-model="valid" lazy-validation>
            <v-textarea
              v-model="body"
              outlined
              rounded
              background-color="#d7fbff"
              class="comment-input"
              type="text"
              required
              :placeholder="$t('scream.writeComment')"
              auto-grow
              rows="1"
              :rules="commentRules"
              @blur="$refs.commentform.resetValidation()"
              @keydown.enter.prevent.exact="handleCommentSubmit"
              @keydown.ctrl.enter.prevent="newLine"
            >
              <template v-slot:append-outer>
                <v-btn
                  icon
                  color="primary"
                  :loading="loadingForm"
                  @click="handleCommentSubmit"
                >
                  <v-icon>
                    {{ svg.send }}
                  </v-icon>
                </v-btn>
              </template>
            </v-textarea>
          </v-form>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
// SVG ICONS
import { mdiSend } from '@mdi/js'

import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['screamId'],
  data: () => ({
    body: '',
    svg: {
      send: mdiSend
    },
    // commentRules: [v => (v && !!v.trim()) || this.$t('scream.commentErr')],
    valid: true
  }),
  computed: {
    commentRules() {
      return [v => (v && !!v.trim()) || this.$t('scream.commentErr')]
    },
    ...mapGetters(['loadingForm', 'userCredentials'])
  },
  methods: {
    handleCommentSubmit() {
      if (!this.$refs.commentform.validate()) {
        return false
      }

      this.$store
        .dispatch('SUBMIT_COMMENT', {
          screamId: this.screamId,
          comment: {
            body: this.body,
            name: this.userCredentials.name
          }
        })
        .then(() => {
          this.$refs.commentform.reset()
        })
        .catch(error => error)
    },
    newLine(e) {
      const caret = e.target.selectionStart
      e.target.setRangeText('\n', caret, caret, 'end')
      this.body = e.target.value
    }
  }
}
</script>

<style lang="scss">
.comment-input {
  // .v-input__slot {
  //   background: #d7fbff !important;
  // }

  .v-input__append-outer {
    align-self: flex-end;
    margin-top: 0px !important;
    margin-bottom: 40px !important;
  }

  textarea {
    margin-top: 0px !important;
    padding: 12px !important;
    white-space: nowrap;
    @media screen and (max-width: 599px) {
      padding-left: 0 !important;
    }
  }
}
</style>
