
// Helper auth utilities, token storage, and axios interceptor (basic)
import api from './api'
import axios from 'axios'
import { useAuthStore } from '../store'

export async function login(username: string, password: string) {
  const res = await api.login(username, password)
  const auth = useAuthStore()
  auth.setToken(res.token)
  auth.user = res.user
  // configure axios to send token in headers (for real backend)
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`
  return res
}

export function logout() {
  const auth = useAuthStore()
  auth.logout()
  delete axios.defaults.headers.common['Authorization']
}
