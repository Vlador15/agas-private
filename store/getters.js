// import { state } from './board'

export default {
  typingUsers: ({ users, user }) =>
    users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
  getSubjects: state => state.subjects,
  getCategoryList: state => state.categoryList,
  getTeacherFilter: state => state.teacherFilter,
  getTestSubjectFilter: state => state.testSubjectFilter,
  getTestSubject: state => state.testSubject,
  getTeacherIdData: state => state.teacherIdData,
  getTeachers: state => state.listTeachers,
  getProducts: state => state.productsCatalogs,
  feedbacksGet: state => state.feedbacks,
  productsGet: state => state.products,
  profileTeacherGet: state => state.profileTeacher,
  profileStudentGet: state => state.profileStudent,
  isAuthenticated: state => !!state.token,
  errors: state => state.error,
  infinitiDataToLoad: state => state.infinitiDataToLoad,
  userCredentials: state => state.authUser.credentials,
  screamList: state => state.screams,
  userScreamList: state => state.userScreams,
  lastScream: state => state.lastScream,
  quizzesList: state => state.quizzes,
  userLikes: state => state.authUser.likes,
  userNotifications: state => state.authUser.notifications,
  loadingUser: state => state.loading.user,
  loadingUI: state => state.loading.ui,
  loadingForm: state => state.loading.form,
  selectedScream: state => state.selectedScream,
  unreadNotifications: state => {
    if (state.authUser.notifications) {
      const unread = state.authUser.notifications.filter(function (
        notification
      ) {
        return notification.read === false
      })
      return !!unread.length
    }
  },
  userSelected: state => {
    if (state.dataUserSelected) {
      return state.dataUserSelected.user
    }
  },
  // sidebar
  sidebarDrawer: state => state.sidebarDrawer,
  sidebarMob: state => state.sidebarMob,
  sidebarDrawerMini: state => state.sidebarDrawerMini,
  // store
  storeCats: state => state.store.categories,
  storeFilter: state => state.store.filter,
  filteredProducts: (state, getters) => {
    if (
      getters.storeFilter[0] === '' ||
      typeof getters.storeFilter[0] === 'undefined'
    ) {
      return state.store.products
    }
    return state.store.products.filter(item => {
      if (item.catIds.some(cat => cat.id === getters.storeFilter[0])) {
        return item
      }
    })
  },

  // profile
  profileEditable: state => state.profileEditable,

  // BARTING
  getBartsHistory: state => state.bartsHistory,
  interestHistory: state => state.interestHistory
}
