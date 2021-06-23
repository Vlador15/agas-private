// import BoardApi from '../service/api_board'
import Vue from 'vue'

export const state = () => ({
  adList: [],
  filteredList: [],
  filter: null
})

export const getters = {
  adList: state => state.adList,
  filteredList: state => state.filteredList,
  filter: state => state.filter
}

export const mutations = {
  ADD_NEW_AD(state, newAd) {
    state.adList.unshift(newAd)
  },
  SET_ADS_LIST(state, ads) {
    state.adList.push(...ads)
    state.filteredList.push(...ads)
  },
  SET_ADS_FILTER(state, filter) {
    state.filter = filter
  },
  RESET_ADS_LIST(state) {
    state.adList = []
    state.filteredList = []
  },
  SET_FILTERED_ADS_LIST(state, ads) {
    state.filteredList = ads
  },
  SET_DELETE_AD: (state, adId) => {
    const index = state.adList.findIndex(ad => ad.id === adId)
    Vue.delete(state.adList, index)
  },
  SET_EDITED_AD(state, data) {
    data.purl = data.purls[0] ? data.purls[0] : 'no_img'
    data.id = data.adId
    delete data.adId
    const index = state.adList.findIndex(i => i.id === data.id)
    state.adList.splice(index, 1, data)
  }
}

export const actions = {
  async AUTH({ dispatch, rootGetters }) {
    if (!rootGetters.isAuthenticated) {
      this.$router.push({ name: `login___${this.$i18n.locale}` })
      return
    }
    if (!rootGetters.userCredentials) {
      await dispatch('FETCH_AUTH_USER', null, { root: true })
    }
    const userCredentials = {
      uid: rootGetters.userCredentials.userId,
      email: rootGetters.userCredentials.email,
      name: rootGetters.userCredentials.name,
      phone: rootGetters.userCredentials.phone
    }
    try {
      const res = await this.$api_board.post('auth', userCredentials)
      this.$api_board.defaults.headers.common.Authorization_board = `Bearer ${res.data.idToken}`
    } catch (e) {
      console.log(e)
      if (
        e.response.data.e.code === 'auth/invalid-custom-token' ||
        e.response.data.e.code === 'nouid'
      ) {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    }
  },
  async CHECK_AUTH({ dispatch, rootGetters, router }) {
    if (!rootGetters.isAuthenticated)
      router.push({ name: `login___${this.$i18n.locale}` })
    if (!this.$api_board.defaults.headers.common.Authorization_board) {
      await dispatch('AUTH')
    }
  },
  async CREATE_AD({ commit, dispatch }, adDetails) {
    commit('SET_LOADING', { name: 'form', value: true }, { root: true })
    try {
      const createStatus = await this.$api_board.post('createad', adDetails)
      commit('ADD_NEW_AD', createStatus.data)
      commit('SET_LOADING', { name: 'form', value: false }, { root: true })
      return createStatus.data.id
    } catch (e) {
      if (
        e.response.data &&
        e.response.data.error &&
        e.response.data.error === 'wrong user'
      ) {
        console.log(e.response.data)
        dispatch('LOGOUT_USER', null, { root: true })
      }
      commit('SET_LOADING', { name: 'form', value: false }, { root: true })
    }
  },
  async EDIT_AD({ commit, dispatch }, adDetails) {
    commit('SET_LOADING', { name: 'form', value: true }, { root: true })
    try {
      const newAd = {}
      for (const pair of adDetails.entries()) {
        newAd[pair[0]] = pair[1]
      }

      const editStatus = await this.$api_board.post(
        `/editad/${adDetails.get('adId')}`,
        adDetails
      )

      newAd.purls = [editStatus.data.newImg]

      commit('SET_EDITED_AD', newAd)
      commit('SET_LOADING', { name: 'form', value: false }, { root: true })
      return editStatus.data.message
    } catch (e) {
      console.log(e)
      if (
        e.response.data &&
        e.response.data.error &&
        e.response.data.error === 'wrong user'
      ) {
        console.log(e.response.data)
        dispatch('LOGOUT_USER', null, { root: true })
      }
      commit('SET_LOADING', { name: 'form', value: false }, { root: true })
    }
  },
  async UPLOAD_IMAGE({ commit, dispatch }, formData) {
    commit('SET_LOADING', { name: 'form', value: true }, { root: true })
    try {
      const res = await this.$api_board.post('uploadImage', formData)
      return res.data
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'form', value: false }, { root: true })
    }
  },
  async FETCH_ADS_BY_CAT({ commit }, category) {
    commit('SET_LOADING', { name: 'ad', value: true }, { root: true })
    await this.$api_board
      .get(`ads/${category}`)
      .then(res => {
        commit('SET_ADS_LIST', res.data)
        commit('SET_LOADING', { name: 'ad', value: false }, { root: true })
      })
      .catch(error => error)
  },
  async FETCH_FILTERED_ADS({ commit, getters }, filter = null) {
    commit('SET_LOADING', { name: 'ad', value: true }, { root: true })
    let query = ''
    if (filter) {
      query = '?'
      if (filter.animal_type) {
        query += `animal_type=${filter.animal_type}&`
      }
      if (filter.breed) {
        query += `breed=${filter.breed}&`
      }
      if (filter.city) {
        query += `city=${filter.city}&`
      }
      if (filter.deal_type) {
        query += `deal_type=${filter.deal_type}&`
      }
      if (filter.gender) {
        query += `gender=${filter.gender}&`
      }
      if (filter.minPrice) {
        query += `minPrice=${filter.minPrice}&`
      }
      if (filter.maxPrice) {
        query += `maxPrice=${filter.maxPrice}&`
      }
      if (filter.startAfterId) {
        query += `startAfterId=${filter.startAfterId}&`
      }
    }

    commit('SET_ADS_FILTER', filter)

    const resolve = await this.$api_board.get(`adsfiltered${query}`)
    const data = resolve.data
    if (data.length) {
      commit('SET_ADS_LIST', data)
      commit('SET_LOADING', { name: 'ad', value: false }, { root: true })
    }
    return data.length
  },
  async GET_AD({ commit }, id) {
    try {
      commit('SET_LOADING', { name: 'user', value: true }, { root: true })
      let ad = {}
      await this.$api_board.get(`ad/${id}/`).then(res => {
        ad = res.data
        commit('SET_LOADING', { name: 'user', value: false }, { root: true })
      })
      return ad
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'user', value: false }, { root: true })
    }
  },
  async GET_FILTERED_PET_ADS({ commit }, filterData) {
    try {
      commit('SET_LOADING', { name: 'user', value: true }, { root: true })
      let ads = []
      await this.$api_board.post(`petsfilter`, filterData).then(res => {
        ads = res.data
        console.log(ads)
        commit('SET_LOADING', { name: 'user', value: false }, { root: true })
      })
      return ads
    } catch (e) {
      console.log(e)
      commit('SET_LOADING', { name: 'user', value: false }, { root: true })
    }
  },
  async DELETE_AD({ commit, dispatch }, adId) {
    await dispatch('CHECK_AUTH')
    commit('SET_LOADING', { name: 'user', value: true }, { root: true })
    try {
      const deleteStatus = await this.$api_board.delete(`deletead/${adId}`)
      commit('SET_DELETE_AD', adId)
      commit('SET_LOADING', { name: 'user', value: false }, { root: true })
      return deleteStatus
    } catch (error) {
      console.log('ERR-.', error)
      commit('SET_LOADING', { name: 'user', value: false }, { root: true })
    }
  },
  async FETCH_USER_ADS({ commit }, userId) {
    commit('SET_LOADING', { name: 'ad', value: true }, { root: true })
    await this.$api_board
      .get(`userads/${userId}`)
      .then(res => {
        commit('SET_AUTH_USER_ADLIST', res.data)
        commit('SET_LOADING', { name: 'ad', value: false }, { root: true })
      })
      .catch(error => error)
  },
  async FETCH_AUTH_USER_ADS({ commit }) {
    commit('SET_LOADING', { name: 'ad', value: true }, { root: true })
    await this.$api_board
      .get(`auserads/`)
      .then(res => {
        commit('SET_AUTH_USER_ADLIST', res.data)
        commit('SET_LOADING', { name: 'ad', value: false }, { root: true })
      })
      .catch(error => error)
  }
}
