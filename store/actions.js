/* eslint-disable no-unused-vars */
import axios from 'axios'
// import Api from '../service/api'
// import Api from '../plugins/api'

export default {
  async PUT_PRODUCTS_IN_MODER({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')
    await this.$apiLearning
      .put(`products`, data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_DATA_PRODUCTS_MODER', res.data.data)
      })
  },
  async DELETE_PRODUCTS_IN_MODER({ commit }, uId) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .delete(`products?id=${uId}`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  async POST_PRODUCTS_IN_MODER({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('products', data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('ADD_DATA_PRODUCTS_MODER', res.data.result)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_PRODUCTS_IN_MODER({ commit }) {
    await this.$apiLearning
      .get('products')
      .then(res => {
        commit('SET_DATA_PRODUCTS_MODER', res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async DELETE_MODERS({ commit }, uId) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .delete(`moder?uid=${uId}`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  async POST_MODERS({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('moder', data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('ADD_LIST_MODERS', res.data.result)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_MODERS({ commit }) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .get('moders', {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_LIST_MODERS', res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async DELETE_LIST({ commit }, obj) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .delete(`list?language=${obj.ln}&list=${obj.list}&id=${obj.id}`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  async PUT_LIST({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')
    // const data = { data: formData }
    await this.$apiLearning
      .put(`list`, data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_LIST_DATA', res.data.data)
      })
  },
  async POST_LIST({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('list', data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('ADD_IN_LIST_DATA', res.data.result)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_LIST({ commit }, obj) {
    await this.$apiLearning
      .get(`list?language=${obj.ln}&list=${obj.name}`)
      .then(res => {
        commit('SET_LIST_DATA', res.data.data)
      })
  },
  async VALIDATE_MODER({ commit }) {
    const token = localStorage.getItem('auth._token.local')
    try {
      await this.$apiLearning
        .get('moder', {
          headers: {
            Authorization: `${token}`
          }
        })
        .then(res => {
          commit('SET_VALIDE_MODERATOR', res.data.data)
        })
    } catch (err) {
      if (err.response.status === 400) {
        commit('SET_VALIDE_MODERATOR', null)
      }
    }
  },
  async DELETE_TEST_SUBJECT({ commit }, id) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .delete(`test-subject/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_SUBJECTS({ commit }, object) {
    await this.$apiLearning
      .get(`list/subjects?ln=${object.ln}&category=${object.name}`)
      .then(res => {
        const subjects = res.data.data.map(x => x.name)
        commit('SET_SUBJECTS', subjects)
      })
  },
  async GET_CATEGORY({ commit }, lang) {
    await this.$apiLearning.get(`list/category?ln=${lang}`).then(res => {
      commit('SET_CATEGORY', res.data.categories)
    })
  },
  async POST_FEEDBACK({ commit }, data) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('feedback', data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_TEACHER_ID({ commit }, uid) {
    // console.log(uid)
    await this.$apiLearning.get(`teacher/${uid}`).then(res => {
      commit('SET_TEACHER_ID_DATA', res.data.data)
    })
  },
  async GET_TEACHERS({ commit }) {
    await this.$apiLearning.get(`teachers`).then(res => {
      commit('SET_TEACHERS', res.data.data)
    })
  },
  async GET_PRODUCTS({ commit }) {
    await this.$apiLearning.get(`products`).then(res => {
      commit('SET_PRODUCTS', res.data.data)
    })
  },
  async POST_TEST_SUBJECT_FILTER({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('test-subject-filter', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_TEST_SUBJECT_FILTER', res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async POST_TEACHER_FILTER({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('teacher-filter', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_TEACHER_FILTER', res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async POST_TEST_SUBJECT({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('test-subject', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_TEST_SUBJECT', res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async GET_TEST_SUBJECT({ commit }) {
    const token = localStorage.getItem('auth._token.local')
    await this.$apiLearning
      .get(`test-subject`, {
        headers: {
          Authorization: `${token}`
        }
      })
      // commit('SET_BARTS_HISTORY', bartsHistory.data)
      .then(res => {
        commit('SET_TEST_SUBJECT', res.data.data)
        // commit('SET_LOADING', { name: 'user', value: false })
      })
  },
  async PAYMENT_SUCCESS({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('payment/success', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error)
      })
  },
  async GET_FORM_STUDENT({ commit }) {
    const token = localStorage.getItem('auth._token.local')

    try {
      await this.$apiLearning
        .get(`student`, {
          headers: {
            Authorization: `${token}`
          }
        })
        // commit('SET_BARTS_HISTORY', bartsHistory.data)
        .then(res => {
          commit('SET_PROFILE_STUDENT', res.data.data)
          // commit('SET_LOADING', { name: 'user', value: false })
        })
    } catch (err) {
      if (err.response.status === 404) {
        commit('SET_PROFILE_STUDENT', null)
      }
    }
  },
  async AUTH_FORM_STUDENT({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('student', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_PROFILE_STUDENT', res.data.data)
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },
  async PUT_STUDENT({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')
    // const data = { data: formData }
    await this.$apiLearning
      .put(`student`, formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_PROFILE_STUDENT', res.data.data)
        console.log(res)
        // commit('SET_PROFILE_TEACHER', res.data.data)
      })
  },
  async PUT_TEACHER({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')
    // const data = { data: formData }
    await this.$apiLearning
      .put(`teacher`, formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_PROFILE_TEACHER', res.data.data)
        // commit('SET_PROFILE_TEACHER', res.data.data)
      })
  },
  async GET_FEEDBACKS({ commit }) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .get(`feedbacks`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_FEEDBACKS', res.data.data)
      })
  },
  async AUTH_FORM_TEACHER({ commit }, formData) {
    const token = localStorage.getItem('auth._token.local')

    await this.$apiLearning
      .post('teacher', formData, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        commit('SET_PROFILE_TEACHER', res.data.data)
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },
  async GET_FORM_TEACHER({ commit }) {
    const token = localStorage.getItem('auth._token.local')

    try {
      await this.$apiLearning
        .get(`teacher`, {
          headers: {
            Authorization: `${token}`
          }
        })
        // commit('SET_BARTS_HISTORY', bartsHistory.data)
        .then(res => {
          commit('SET_PROFILE_TEACHER', res.data.data)
          // commit('SET_LOADING', { name: 'user', value: false })
        })
    } catch (err) {
      if (err.response.status === 404) {
        commit('SET_PROFILE_TEACHER', null)
      }
    }
  },
  // GET SCREAMS IN STATE
  async GET_SCREAMS({ commit, dispatch }) {
    const resolve = await this.$api.get('screams')
    const data = resolve.data
    commit('SET_SCREAMS', data)
  },
  async GET_LAST_SCREAMS({ commit }, lastScreamCreatedAt = null) {
    const resolve = await this.$api.get(`screamsl/${lastScreamCreatedAt}`)
    const data = resolve.data
    if (data.length) {
      commit('SET_SCREAMS', data)
      commit('SET_LAST_SCREAM', data[data.length - 1].createdAt)
    }
    return data.length
  },
  async GET_USER_SCREAMS({ commit }, options) {
    const resolve = await this.$api.get(
      `uscreams/${options.uid}/${options.lastScreamCreatedAt}`
    )
    const data = resolve.data
    if (data.length) {
      commit('SET_USER_SCREAMS', data)
      commit('SET_LAST_SCREAM', data[data.length - 1].createdAt)
    }
    return data.length
  },

  // LOGIN / REGISTRATION / LOGOUT / CLEAR ERRORS
  async SIGN_IN({ getters, dispatch, commit }, authData) {
    commit('SET_LOADING', { name: 'form', value: true })
    try {
      const response = await this.$auth.loginWith('local', {
        data: authData
      })
      await dispatch('AUTH_USER', `Bearer ${response.data.token}`)
      await dispatch('FETCH_AUTH_USER')
      commit('SET_LOADING', { name: 'form', value: false })
      this.$router.push({ name: `index___${this.$i18n.locale}` })
    } catch (err) {
      if (err.response.status === 403) {
        commit('SET_ERROR', 'Не правильная почта или пароль')
      }
      commit('SET_LOADING', { name: 'form', value: false })
    }
  },
  async RECOVER_PASS({ commit }, { email }) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post('passwordreset', { email })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        if (error.response.status === 403) {
          commit('SET_ERROR', 'Не правильная почта или пароль')
          // commit('SET_ERROR', error.response.data.general)
        }
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },

  async SIGN_UP({ dispatch, commit }, formNewUser) {
    commit('SET_LOADING', { name: 'form', value: true })

    try {
      await this.$api
        .post('signup', formNewUser)
        .then(async res => {
          const FBidToken = `Bearer ${res.data.token}`
          await dispatch('AUTH_USER', FBidToken)
          await dispatch('FETCH_AUTH_USER')
        })
        .then(async () => {
          await this.$auth.loginWith('local', {
            data: {
              email: formNewUser.email,
              password: formNewUser.password
            }
          })
          commit('SET_LOADING', { name: 'form', value: false })
        })
    } catch (e) {
      if (e.response.status === 400) {
        commit('SET_ERROR', e.response.data.handle)
        // commit('SET_ERROR', error.response.data.general)
      }
      commit('SET_LOADING', { name: 'form', value: false })
    }
  },
  async LOGOUT_USER({ commit }) {
    if (this.$auth.loggedIn) {
      await this.$auth.logout()
      delete axios.defaults.headers.common.Authorization
      commit('SET_USER_UNAUTHENTICATED', {})
      this.$router.push({ name: `login___${this.$i18n.locale}` })
    }
  },
  AUTH_USER({ commit }, token) {
    // axios.defaults.headers.common.Authorization = token
    // this.$axios.defaults.headers.common.Authorization = token
    this.$api.defaults.headers.common.Authorization = token
    commit('SET_AUTHORIZATION', token)
  },
  CLEAR_ERROR: ({ commit }) => commit('SET_CLEAR_ERROR'),

  // FETCH/GET USER AUTHTENTICATED
  async FETCH_AUTH_USER({ getters, commit }) {
    if (!getters.isAuthenticated) {
      this.$router.push({ name: `login___${this.$i18n.locale}` })
      return
    }
    commit('SET_LOADING', { name: 'user', value: true })
    await this.$api
      .get('user')
      .then(res => {
        commit('SET_AUTH_USER', res.data)
        commit('SET_LOADING', { name: 'user', value: false })
      })
      .catch(error => {
        if (error.response.data.error === 'Unauthorized') {
          this.$router.push({ name: `login___${this.$i18n.locale}` })
        }
        return error
      })
  },

  // EDIT AUTH USER PROFILE
  async UPLOAD_IMAGE({ commit, dispatch }, formData) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post('user/image', formData)
      .then(res => {
        dispatch('FETCH_AUTH_USER')
        dispatch('GET_SCREAMS')
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => console.log(error))
  },
  async EDIT_USER_DETAILS({ dispatch, commit }, userDetails) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post('user', userDetails)
      .then(res => {
        dispatch('FETCH_AUTH_USER')
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },

  // USER INTERACTIONS
  async LIKE_SCREAM({ commit }, { screamId, type }) {
    commit('SET_LIKE', { screamId, type })
    await this.$api.get(`scream/${screamId}/like/${type}`).then(res => {
      commit('SET_SCREAM', res.data)
      // commit('SET_LIKE', { data: res.data, type })
    })
  },
  async EDIT_LIKE_SCREAM({ commit }, { screamId, type }) {
    commit('EDIT_LIKE', { screamId, type })
    await this.$api.get(`scream/${screamId}/like/${type}/edit`).then(res => {
      commit('SET_SCREAM', res.data)
      // commit('EDIT_LIKE', { data: res.data, type })
    })
  },
  async UNLIKE_SCREAM({ commit }, screamId) {
    await this.$api.get(`scream/${screamId}/unlike`).then(res => {
      commit('SET_SCREAM', res.data)
      commit('SET_UNLIKE', res.data)
    })
  },
  async POST_NEW_SCREAM({ commit, dispatch }, newScream) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post('scream', newScream)
      .then(res => {
        commit('SET_NEW_SCREAM', res.data)
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(e => {
        console.log(e)
        if (
          e.response.data &&
          e.response.data.error &&
          e.response.data.error === 'wrong user'
        ) {
          console.log(e.response.data)
          dispatch('LOGOUT_USER')
        }
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },
  async EDIT_SCREAM({ commit, dispatch }, editedScream) {
    commit('SET_LOADING', { name: 'user', value: true })
    await this.$api
      .post(`screamedit/${editedScream.sid}/`, editedScream.formData)
      .then(res => {
        if (res.data.updatedScream) {
          commit('EDIT_SCREAM', {
            id: editedScream.sid,
            ...res.data.updatedScream
          })
        }
        // commit('SET_NEW_SCREAM', res.data)
        commit('SET_LOADING', { name: 'user', value: false })
      })
      .catch(e => {
        console.log(e)
        if (
          e.response.data &&
          e.response.data.error &&
          e.response.data.error === 'wrong user'
        ) {
          console.log(e.response.data)
          dispatch('LOGOUT_USER')
        }
        commit('SET_LOADING', { name: 'user', value: false })
      })
  },

  // BARTING
  async SEND_BARTS({ commit, dispatch }, transaction) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post('sendbarts', transaction)
      .then(res => {
        if (res.data.error) {
          commit('SET_ERROR', res.data.error)
        } else {
          // TODO TRAFIC OPTIMIZE NEED GET_BALANCE API
          dispatch('FETCH_AUTH_USER')
          commit('ADD_BARTS_HISTORY_ITEM', res.data)
          commit('SET_CLEAR_ERROR')
        }
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },
  async GET_BARTS_HISTORY({ commit }) {
    const bartsHistory = await this.$api.get('bartshistory')
    commit('SET_BARTS_HISTORY', bartsHistory.data)
  },
  async GET_BANKINTEREST_HISTORY({ commit }) {
    const interestHistory = await this.$api.get('userinterest')
    commit('SET_BANKINTEREST_HISTORY', interestHistory.data)
  },
  async INVEST_BARTS({ commit, dispatch }, transaction) {
    commit('SET_LOADING', { name: 'form', value: true })
    try {
      await this.$api.post('invest', transaction).then(res => {
        if (res.data.error) {
          commit('SET_ERROR', res.data.error)
        } else {
          // TODO TRAFIC OPTIMIZE NEED GET_BALANCE API
          dispatch('FETCH_AUTH_USER')
          commit('ADD_BARTS_HISTORY_ITEM', res.data)
          commit('SET_CLEAR_ERROR')
        }
        commit('SET_LOADING', { name: 'form', value: false })
      })
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'form', value: false })
    }
  },
  async WITHDRAW_BARTS({ commit, dispatch }, transaction) {
    commit('SET_LOADING', { name: 'form', value: true })
    try {
      await await this.$api.post('withdraw', transaction).then(res => {
        if (res.data.error) {
          commit('SET_ERROR', res.data.error)
        } else {
          // TODO TRAFIC OPTIMIZE NEED GET_BALANCE API
          dispatch('FETCH_AUTH_USER')
          commit('ADD_BARTS_HISTORY_ITEM', res.data)
          commit('SET_CLEAR_ERROR')
        }
        commit('SET_LOADING', { name: 'form', value: false })
      })
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'form', value: false })
    }
  },
  // END BARTING
  async DELETE_SCREAM({ commit }, screamId) {
    commit('SET_LOADING', { name: 'user', value: true })
    await this.$api
      .delete(`scream/${screamId}/`)
      .then(res => {
        commit('SET_DELETE_SCREAM', screamId)
        commit('SET_LOADING', { name: 'user', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'user', value: false })
      })
  },

  // SELECT A SCREAM
  async GET_SCREAM({ commit }, screamId) {
    try {
      commit('SET_LOADING', { name: 'user', value: true })
      await this.$api.get(`scream/${screamId}/`).then(res => {
        commit('SET_SELECTED_SCREAM', res.data)
        commit('SET_LOADING', { name: 'user', value: false })
      })
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'user', value: false })
    }
  },

  // COMMENT IN SCREAM
  async SUBMIT_COMMENT({ commit }, commentData) {
    commit('SET_LOADING', { name: 'form', value: true })
    await this.$api
      .post(`scream/${commentData.screamId}/comment`, commentData.comment)
      .then(res => {
        commit('SET_IN_SELECTED_SCREAM_COMMENTS', res.data)
        commit('SET_LOADING', { name: 'form', value: false })
      })
      .catch(error => {
        // reject(error)
        console.log(error)
        commit('SET_LOADING', { name: 'form', value: false })
      })
  },
  CLEAN_SELECTED_SCREAM: ({ commit }) => commit('SET_CLEAN_SCREAM'),

  // NOTIFICATIONS
  async MARK_NOTIFICATIONS({ commit }, notificationId) {
    await this.$api
      .post('notifications', notificationId)
      .then(() => {
        commit('SET_NOTIFICATIONS', notificationId)
      })
      .catch(error => {
        console.log(error)
        // reject(error)
      })
  },

  // SELECT A USER NAME AND GET THE DATA TO SEE IN PROFILE USERS PAGE
  async GET_USER({ commit }, handle) {
    commit('SET_LOADING', { name: 'ui', value: true })
    await this.$api
      .get(`user/${handle}`)
      .then(res => {
        commit('SET_DATA_USER_PROFILE', res.data)
        commit('SET_LOADING', { name: 'ui', value: false })
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', { name: 'ui', value: false })
      })
  },

  async GET_U({ commit }, uid) {
    commit('SET_LOADING', { name: 'ui', value: true })
    try {
      const user = await this.$api.get(`u/${uid}`)
      commit('SET_LOADING', { name: 'ui', value: false })
      return user.data
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'ui', value: false })
    }
  },

  // SET A PATH TO AUTHENTICATED/UNAUTHENTICATED USER BEFORE CREATE (LOGIN OR SIGNUP)
  TO_LAND: ({ commit }, pathName) => {
    commit('SET_LAND', pathName)
  }
}
