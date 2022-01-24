import Vue from 'vue'

export default {
  setUser(state, user) {
    state.user = user
  },
  SET_SUBJECTS(state, sub) {
    state.subjects = sub
  },
  SET_CATEGORY(state, category) {
    state.categoryList = category
  },
  SET_TEACHER_ID_DATA(state, teacher) {
    state.teacherIdData = teacher
  },
  SET_TEST_SUBJECT_FILTER(state, filterTestSubject) {
    state.testSubjectFilter = filterTestSubject
  },
  SET_TEACHER_FILTER(state, filter) {
    state.teacherFilter = filter
  },
  SET_TEST_SUBJECT(state, subject) {
    state.testSubject = subject
  },
  SET_TEACHERS(state, teachers) {
    state.listTeachers = teachers
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg]
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  },
  clearData(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status
  },
  SET_PROFILE_STUDENT: (state, profile) => {
    state.profileStudent = profile
  },
  SET_FEEDBACKS: (state, feedbacks) => {
    state.feedbacks = feedbacks
  },
  SET_PRODUCTS: (state, products) => {
    state.productsCatalogs = products
  },
  SET_PROFILE_TEACHER: (state, profile) => {
    state.profileTeacher = profile
  },
  // USER LOGIN/REGISTRATION/AUTH
  SET_AUTHORIZATION: (state, token) => {
    state.token = token
  },
  SET_AUTH_USER: (state, data) => {
    state.authUser = data
  },
  SET_USER_UNAUTHENTICATED: (state, emptyData) => {
    state.authUser = emptyData
    state.token = ''
    state.bartsHistory = []
    state.interestHistory = null
  },

  // USER INTERACTIONS
  SET_LIKE: (state, { screamId, type }) => {
    const index = state.authUser.likes.length
    const likedScream = {
      screamId,
      userHandle: state.authUser.credentials.handle,
      type
    }
    Vue.set(state.authUser.likes, index, likedScream)
  },
  EDIT_LIKE: (state, { screamId, type }) => {
    const index = state.authUser.likes.findIndex(
      scream => scream.screamId === screamId
    )
    state.authUser.likes[index].type = type
  },
  SET_UNLIKE: (state, data) => {
    const index = state.authUser.likes.findIndex(
      scream => scream.screamId === data.screamId
    )
    Vue.delete(state.authUser.likes, index)
  },

  // STORE
  SET_FILTER: (state, catId) => {
    state.store.filter.push(catId)
  },

  SET_DELETE_FILTER: (state, catId) => {
    const index = state.store.filter.indexOf(catId)
    state.store.filter.splice(index, 1)
  },

  // QUIZZES
  SET_QUIZZES: (state, data) => {
    state.quizzes = data
  },
  SET_QUIZ: (state, data) => {
    const index = state.quizzes.findIndex(quiz => quiz.quizId === data.quizId)
    Vue.set(state.quizzes, index, data)
  },
  SET_NEW_QUIZ: (state, newQuiz) => {
    state.quizzes.unshift(newQuiz)
    state.loading.user = false
  },

  // SCREAMS/POST
  SET_SCREAMS: (state, data) => {
    state.screams.push(...data)
  },
  SET_USER_SCREAMS: (state, data) => {
    state.userScreams.push(...data)
  },
  SET_LAST_SCREAM: (state, lastScream) => {
    state.lastScream = lastScream
  },
  RESET_LAST_SCREAM: state => {
    state.lastScream = null
  },
  RESET_SCREAMS: state => {
    state.screams = []
  },
  RESET_USER_SCREAMS: state => {
    state.userScreams = []
  },
  SET_SCREAM: (state, data) => {
    const index = state.screams.findIndex(
      scream => scream.screamId === data.screamId
    )
    Vue.set(state.screams, index, data)
  },
  SET_NEW_SCREAM: (state, newScream) => {
    state.screams.unshift(newScream)
    state.loading.user = false
  },
  EDIT_SCREAM: (state, editedScream) => {
    const index = state.screams.findIndex(
      scream => scream.screamId === editedScream.id
    )
    state.screams[index].body = editedScream.body
    if (!state.screams[index].tags) {
      Vue.set(state.screams[index], 'tags', editedScream.tags)
    }
    state.screams[index].tags = editedScream.tags

    if (editedScream.imgUrls) {
      if (!state.screams[index].imgUrls) {
        Vue.set(state.screams[index], 'imgUrls', editedScream.imgUrls)
      }
      state.screams[index].imgUrls = editedScream.imgUrls
    }

    state.loading.user = false
  },
  SET_DELETE_SCREAM: (state, screamId) => {
    const index = state.screams.findIndex(
      scream => scream.screamId === screamId
    )
    Vue.delete(state.screams, index)
  },
  SET_CLEAN_SCREAM: state => (state.selectedScream = {}),
  SET_SELECTED_SCREAM: (state, scream) => (state.selectedScream = scream),

  // NEW COMMENT IN A SCREAM
  SET_IN_SELECTED_SCREAM_COMMENTS: (state, commentData) => {
    const index = state.screams.findIndex(
      scream => scream.screamId === commentData.screamId
    )
    state.screams[index].commentCount += 1
    state.selectedScream.comments.push(commentData)
  },

  // LOADING/ERRORS
  SET_LOADING: (state, { name, value }) => (state.loading[name] = value),
  SET_ERROR: (state, error) => (state.error = error),
  SET_LAND: (state, pathName) => (state.path = pathName),
  SET_CLEAR_ERROR: state => (state.error = ''),
  SET_MODAL: (state, { name, value }) => {
    state.modals[name] = value
  },

  // NOTIFICATIONS
  SET_NOTIFICATIONS: (state, notificationId) => {
    const index = state.authUser.notifications.findIndex(
      notification => notification.notificationId === notificationId[0]
    )
    state.authUser.notifications[index].read = true
  },

  // SET USER IN PROFILE PAGE
  SET_DATA_USER_PROFILE: (state, userData) =>
    (state.dataUserSelected = userData),

  // SIDEBAR DRAWER
  TOGGLE_SIDEBAR_DRAWER(state) {
    state.sidebarDrawer = !state.sidebarDrawer
  },
  TOGGLE_SIDEBAR_MOB(state) {
    state.sidebarMob = !state.sidebarMob
  },
  TOGGLE_SIDEBAR_DRAWER_MINI(state) {
    state.sidebarDrawerMini = !state.sidebarDrawerMini
  },

  // PROFILE
  PROFILE_EDITABLE(state) {
    state.profileEditable = true
  },
  PROFILE_EDITABLE_OFF(state) {
    state.profileEditable = false
  },

  // BARTING
  SET_BARTS_HISTORY(state, bartHistory) {
    state.bartsHistory = bartHistory
  },
  SET_BANKINTEREST_HISTORY(state, interestHistory) {
    state.interestHistory = interestHistory
  },
  ADD_BARTS_HISTORY_ITEM(state, item) {
    if (state.bartsHistory) {
      state.bartsHistory.push(item)
    }
  },

  // INFINITI
  SET_INF_DATA_TO_LOAD(state, val) {
    state.infinitiDataToLoad = val
  }
}
