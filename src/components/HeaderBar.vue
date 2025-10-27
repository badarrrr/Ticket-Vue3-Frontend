
<template>
  <div class="header container" style="display:flex; align-items:center; justify-content:space-between;">
    <div style="display:flex; align-items:center; gap:12px;">
      <img src="@/assets/logo.png" alt="logo" style="height:36px;"/>
      <div>
        <div style="font-weight:600;">Ticketing System</div>
        <div style="font-size:12px; color:#666;">Testing · Development · QA</div>
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:12px;">
      <el-button type="text" @click="$router.push({ name: 'Home' })">Dashboard</el-button>
      <el-button type="text" @click="$router.push({ name: 'Tickets' })">Tickets</el-button>
      <el-button type="text" @click="$router.push({ name: 'TicketCreate' })">Create</el-button>
      <el-button type="text" @click="$router.push({ name: 'AIInsights' })">AI Insights</el-button>

      <el-dropdown v-if="user">
        <span class="el-dropdown-link" style="cursor:pointer;">
          <el-avatar size="32">{{ initials }}</el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goProfile">Profile</el-dropdown-item>
            <el-dropdown-item divided @click="doLogout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button v-else type="primary" @click="$router.push({ name: 'Login' })">Login</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../store'
import { logout } from '../services/auth'
import { useRouter } from "vue-router";

const auth = useAuthStore()
const user = computed(() => auth.user)
const router = useRouter()

const initials = computed(() => {
  if (!user.value) return ''
  return (user.value.fullName || user.value.username).split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()
})

function goProfile() {
  router.push('/profile')
}
function doLogout() {
  logout()
  window.location.href = '/login'
}
</script>

<style scoped>
.header {
  padding: 12px 20px;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
