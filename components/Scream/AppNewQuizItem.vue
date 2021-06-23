<template>
  <v-sheet id="new-post" ref="myScroll" class="mb-6" color="#E3F2FD">
    <form ref="form" @submit.prevent="handlePostSubmit">
      <v-card class="mb-6 newquiz-card pl-2">
        <v-system-bar color="primary" class="ml-n2"> </v-system-bar>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                v-model="newQuiz.title"
                placeholder="Название"
                @focus="active"
                @blur="disactive"
              ></v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-textarea
                v-model="newQuiz.description"
                rows="1"
                auto-grow
                label="Описание"
                @focus="active"
                @blur="disactive"
              ></v-textarea>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon>
              <v-icon>{{ svg.dots }}</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-card>
      <v-card
        v-for="(q, i) in newQuiz.questions"
        :key="i"
        class="mb-6 newquiz-card px-2 py-4"
      >
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="q.title"
              filled
              :placeholder="q.title"
              @focus="qActive"
              @blur="qDisactive"
            ></v-text-field>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon @click="deleteQuestion(i)">
              <v-icon>{{ svg.delete }}</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item
          v-for="(answer, ai) in q.answers"
          :key="ai"
          :ref="`q-${i}-answer-${ai}`"
        >
          <v-textarea
            v-model="q.answers[ai]"
            :prepend-icon="svg.radio"
            :append-outer-icon="svg.close"
            :label="`Вариант №${ai + 1}`"
            rows="1"
            auto-grow
            @click:append-outer="deleteAnswer(i, ai)"
            @focus="active"
            @blur="disactive"
          >
          </v-textarea>
        </v-list-item>
        <v-list-item>
          <v-text-field
            style="max-width: 190px"
            readonly
            :prepend-icon="svg.radio"
            rows="1"
            auto-grow
            label="Добавить вариант"
            @focus.prevent
            @click="addAnswer(i)"
            @focus="active"
            @blur="disactive"
          ></v-text-field>
        </v-list-item>
      </v-card>

      <v-row justify="center" class="mb-6">
        <v-btn x-large fab color="primary--text" @click="addQuestion">
          <v-icon>{{ svg.plus }}</v-icon>
        </v-btn>
      </v-row>

      <v-card>
        <v-list-item>
          <v-row align="center" justify="start">
            <v-col cols="auto" md="auto">
              <v-chip
                link
                color="blue lighten-5 blue--text text--accent-5"
                @click="openFileupload"
              >
                <v-avatar left class="">
                  <v-icon>{{ svg.image }}</v-icon>
                </v-avatar>
                Изображение
              </v-chip>
              <input
                id="newpostimg"
                type="file"
                hidden
                @change="postImgUploaded"
              />
            </v-col>

            <v-col cols="auto" md="auto">
              <v-menu
                v-model="menu"
                bottom
                right
                transition="scale-transition"
                origin="top left"
              >
                <template v-slot:activator="{ on }">
                  <v-chip
                    color="blue lighten-5 blue--text text--accent-5"
                    v-on="on"
                  >
                    <v-avatar left class="">
                      <v-icon>{{ visibility.icon }}</v-icon>
                    </v-avatar>
                    {{ visibility.text }}
                    <v-avatar>
                      <v-icon>{{ svg.menuDown }}</v-icon>
                    </v-avatar>
                  </v-chip>
                </template>
                <v-card>
                  <v-list color="blue lighten-5 blue--text text--accent-5">
                    <v-list-item>
                      <v-radio-group
                        v-model="radios"
                        mandatory
                        @change="visibilityChange"
                      >
                        <template v-slot:label>
                          <div>
                            Кому будет <strong>видна публикация</strong>
                          </div>
                        </template>
                        <v-radio value="all">
                          <template v-slot:label>
                            <div>Всему интернету</div>
                            <v-icon class="ml-2">{{ svg.web }}</v-icon>
                          </template>
                        </v-radio>
                        <v-radio value="friends">
                          <template v-slot:label>
                            <div>
                              Вашим
                              <strong class="primary--text">друзьям</strong>
                            </div>
                            <v-icon class="ml-2 primary--text">{{
                              svg.friends
                            }}</v-icon>
                          </template>
                        </v-radio>
                        <v-radio value="nobody">
                          <template v-slot:label>
                            <div>
                              Только <strong class="success--text">вам</strong>
                            </div>
                            <v-icon class="ml-2 success--text">{{
                              svg.lock
                            }}</v-icon>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" block color="primary"> Опубликовать </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-card>
    </form>
    <v-snackbar
      v-model="snackbar"
      color="success"
      timeout="1500"
      bottom
      vertical
    >
      Опрос создан

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
// ICONS
import {
  mdiMessageImageOutline,
  mdiMenuDown,
  mdiWeb,
  mdiAccountGroup,
  mdiLock,
  mdiImage,
  mdiDotsVertical,
  mdiDeleteOutline,
  mdiRadioboxBlank,
  mdiClose,
  mdiPlus
} from '@mdi/js'

export default {
  data() {
    return {
      snackbar: false,
      svg: {
        addImage: mdiMessageImageOutline,
        menuDown: mdiMenuDown,
        web: mdiWeb,
        friends: mdiAccountGroup,
        lock: mdiLock,
        image: mdiImage,
        dots: mdiDotsVertical,
        delete: mdiDeleteOutline,
        radio: mdiRadioboxBlank,
        close: mdiClose,
        plus: mdiPlus
      },
      menu: false,
      radios: 'all',
      postImg: false,
      price: '',
      newImg: null,
      filled: false,
      newQuiz: {
        title: 'Новый опрос',
        description: '',
        questions: [
          {
            title: 'Вопрос',
            answers: ['']
          }
        ]
      }
    }
  },
  computed: {
    visibility() {
      return {
        icon: this.svg.web,
        text: 'Видно всем',
        value: 'all'
      }
    }
  },
  methods: {
    deleteQuestion(i) {
      this.newQuiz.questions.splice(i, 1)
    },
    deleteAnswer(i, ai) {
      this.newQuiz.questions[i].answers.splice(ai, 1)
    },
    addQuestion() {
      const q = {
        title: 'Вопрос',
        answers: ['']
      }
      this.newQuiz.questions.push(q)
    },
    addAnswer(i) {
      const index = this.newQuiz.questions[i].answers.length
      this.newQuiz.questions[i].answers.push('')
      setTimeout(() => {
        this.$refs['q-' + i + '-answer-' + index][0].$el
          .getElementsByTagName('textarea')[0]
          .focus()
      }, 0)
    },
    qActive(e) {
      this.active(e)
      this.filled = true
    },
    qDisactive(e) {
      this.disactive(e)
      this.filled = false
    },
    active(e) {
      e.target.closest('.v-card').classList.add('active')
    },
    disactive(e) {
      e.target.closest('.v-card').classList.remove('active')
    },
    openFileupload() {
      document.getElementById('newpostimg').click()
    },
    visibilityChange() {
      switch (this.radios) {
        case 'all':
          this.visibility.icon = this.svg.web
          this.visibility.text = 'Видно всем'
          this.visibility.all = 'All'
          break
        case 'friends':
          this.visibility.icon = this.svg.friends
          this.visibility.text = 'Видно друзьям'
          this.visibility.value = 'Friends'
          break
        case 'nobody':
          this.visibility.icon = this.svg.lock
          this.visibility.text = 'Никому'
          this.visibility.value = 'Nobody'
          break
        default:
          break
      }
    },
    postImgUploaded(event) {
      const type = event.target.files[0].type
      if (
        type === 'image/jpeg' ||
        type === 'image/jpg' ||
        type === 'image/png' ||
        type === 'image/gif'
      ) {
        this.postImg = true
        setTimeout(() => {
          const output = document.getElementById('output')
          output.src = URL.createObjectURL(event.target.files[0])
          this.newImg = output.src
          // output.onload = () => {
          //   URL.revokeObjectURL(output.src) // free memory
          // }
        }, 0)
      }
    },
    handlePostSubmit() {
      const newQuiz = {
        title: this.newQuiz.title,
        description: this.newQuiz.description,
        questions: this.newQuiz.questions,
        createdAt: new Date(Date.now()).toISOString(),
        quizId: Date.now(),
        userHandle: 'jmuxeu',
        visibility: this.visibility.value
      }

      this.$store.state.quizzes.unshift(newQuiz)

      // clear form
      this.newImg = null
      this.postImg = false
      this.price = ''
      this.title = ''
      this.newQuiz = {
        title: 'Новый опрос',
        description: '',
        questions: [
          {
            title: 'Вопрос',
            answers: ['']
          }
        ]
      }
      this.snackbar = true
    }
  }
}
</script>

<style lang="scss" scoped>
#output {
  width: 100%;
  object-fit: cover;
}

.ps {
  overflow-y: scroll;
  height: 300px;

  &.ps--active-y .ps__thumb-x,
  .ps__thumb-y {
    background-color: #81d4fa !important;
  }

  & .ps__rail-y {
    width: 10px;
  }

  & .ps__rail-y.ps--clicking .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y:hover > .ps__thumb-y {
    background-color: #03a9f4;
    width: 6px;
  }
}

.newquiz-card.active {
  padding-left: 0px !important;
}

.newquiz-card.active {
  border-left: 8px solid #1e88e5;
}
</style>
