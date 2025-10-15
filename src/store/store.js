import { createStore } from 'vuex'

// browser saves this data on your disk (not in memory)
const savedAuthentication = localStorage.getItem('isAuthenticated') === 'true'
const savedUser = JSON.parse(localStorage.getItem('user'))

export default createStore({
  state: {
    isAuthenticated: savedAuthentication || false,
    user: savedUser || null,
  },

  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
      localStorage.setItem('isAuthenticated', status)
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },

  actions: {
    login({ commit }, user) {
      const testUsername = 'username_testing'
      const testPassword = 'password_testing'

      if (user.username === testUsername && user.password === testPassword) {
        commit('setAuthentication', true)
        commit('setUser', user)
        return true
      } else {
        alert('Invalid Credentials')
        return false
      }
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setUser', null)
      localStorage.clear()
    },
  },
})
