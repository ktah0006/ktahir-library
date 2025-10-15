<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <!-- have to be imediately after the v-if -->
        <li class="nav-item" v-else>
          <button class="btn btn-danger ms-3" @click="handleLogout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout()
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
