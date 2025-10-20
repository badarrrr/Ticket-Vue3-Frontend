
import { defineStore } from 'pinia'
import type { User } from '../types'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function logout() {
    token.value = null
    user.value = null
  }

  function setToken(t: string) {
    token.value = t
  }

  return { user, token, logout, setToken, isAuthenticated }
})

export default useAuthStore
