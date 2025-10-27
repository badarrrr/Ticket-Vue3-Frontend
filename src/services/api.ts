
/**
 * Simple API service with mocked endpoints.
 * Replace with real endpoints and remove mocks for production.
 */

import axios from 'axios'
import { useAuthStore } from '../store'
import type { Ticket, User } from '../types'
import { v4 as uuidv4 } from 'uuid'


const isDev = import.meta.env.MODE === 'development'
const api = axios.create({
  baseURL: isDev ? '/api' : 'http://101.43.85.43:8000', // 开发用代理，生产直连
  timeout: 5000
})

api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})


// In-memory mock store (for demo)
const mock = {
  tickets: [] as Ticket[]
}

function sleep(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  // Login 
  async login(username: string, password: string) {
    try {
      const response = await api.post('/api/login/', { username, password })
      const { token, user } = response.data
      return { token, user }
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('username or password error')
      }
      throw new Error(error.message || 'Login fail')
    }
  },

  async listUsers() {
      try {
        const response = await api.get('/api/users/') 
        return response.data 
      } catch (error: any) {
        console.error('Get users list error:', error)
        throw new Error(error.message || 'Fail to get users list')
      }
    },


  // Tickets
  async listTickets() {
      try {
        const response = await api.get('/api/tickets/')
        return response.data
      } catch (error: any) {
        console.error('Get tickets list error:', error)
        throw new Error(error.message || 'Fail to get tickets list')
      }
  },

  async getTicket(id: string) {
      try {
        const response = await api.get(`/api/tickets/${id}/`)
        return response.data
      } catch (error: any) {
        console.error('Get ticket', id ,' error:', error)
        throw new Error(error.message)
      }
  },

  async createTicket(payload: Partial<Ticket>) {
    const now = new Date().toISOString()
    const ticket = {
      title: payload.title || 'Untitled',
      description: payload.description || '',
      software_name: payload.software_name || '',
      software_version: payload.software_version || '',
      discovered_at: payload.discovered_at || now,
      severity: (payload.severity as any) || 'NORMAL',
      module: payload.module,
      assignee: payload.assignee
    }
    try{
        const response = await api.post('/api/tickets/', ticket)
        console.log(response.data)
        return response.data
      } catch (error: any) {
        console.error('Create ticket error:', error)
        throw new Error(error.message || 'Fail to create ticket')
      }
  },

  async submitDevReport(ticketId: string, report: any) {
    await sleep(200)
    // update status to UNDER_REVIEW
    const t = mock.tickets.find((x) => x.id === ticketId)
    if (!t) throw new Error('Ticket not found')
    t.current_status = 'UNDER_REVIEW'
    t.updated_at = new Date().toISOString()
    return t
  },

  async submitQAReview(ticketId: string, review: any) {
    await sleep(200)
    const t = mock.tickets.find((x) => x.id === ticketId)
    if (!t) throw new Error('Ticket not found')
    if (review.agree_to_release) {
      t.current_status = 'IN_REGRESSION'
      t.regressor = review.designated_tester || t.submitter
    } else {
      t.current_status = 'IN_MODIFICATION'
    }
    t.updated_at = new Date().toISOString()
    return t
  },

  async submitRegression(ticketId: string, regression: any) {
    await sleep(200)
    const t = mock.tickets.find((x) => x.id === ticketId)
    if (!t) throw new Error('Ticket not found')
    if (regression.passed) {
      t.current_status = 'CLOSED'
    } else {
      t.current_status = 'UNDER_REVIEW'
    }
    t.updated_at = new Date().toISOString()
    return t
  },

}































// ----------------------------------------------------------------------------------
// const client = axios.create({
//   baseURL: '/api',
//   timeout: 10000
// })