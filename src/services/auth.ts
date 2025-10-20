
// Helper auth utilities, token storage
import api from './api'
import { useAuthStore } from '../store'

export async function login(username: string, password: string) {
  const res = await api.login(username, password)
  const auth = useAuthStore()
  auth.setToken(res.token)
  auth.user = res.user
  return res
}

export function logout() {
  const auth = useAuthStore()
  auth.logout()
}
