
import { defineStore } from 'pinia'
import type { User } from '../types'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)


  async function login(username: string, password: string) {
    const res = await api.login(username, password)
    token.value = res.token
    user.value = res.user
    // store token in memory; for persistence use secure cookie or secure storage
    return res
  }

  function logout() {
    token.value = null
    user.value = null
  }

  function setToken(t: string) {
    token.value = t
  }

  return { user, token, login, logout, setToken, isAuthenticated }
})

export default useAuthStore
