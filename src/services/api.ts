
/**
 * Simple API service with mocked endpoints.
 * Replace with real endpoints and remove mocks for production.
 */

import axios from 'axios'
import type { Ticket, User } from '../types'
import { v4 as uuidv4 } from 'uuid'

const client = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// In-memory mock store (for demo)
const mock = {
  users: [
    { id: 'u1', username: 'alice', fullName: 'Alice Tester', role: 'TESTER', email: 'alice@example.com' },
    { id: 'u2', username: 'bob', fullName: 'Bob Dev', role: 'DEVELOPER', email: 'bob@example.com' },
    { id: 'u3', username: 'carol', fullName: 'Carol QA', role: 'QA', email: 'carol@example.com' }
  ] as User[],
  tickets: [] as Ticket[]
}

function sleep(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  // Auth
  async login(username: string, password: string) {
    await sleep(300)
    const user = mock.users.find((u) => u.username === username)
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials. (Demo: password = "password")')
    }
    // Demo token
    return { token: 'demo-token-' + user.id, user }
  },

  // Tickets
  async listTickets(filters = {}) {
    await sleep(200)
    // naive filtering for demo
    return mock.tickets
  },

  async getTicket(id: string) {
    await sleep(200)
    const t = mock.tickets.find((x) => x.id === id)
    if (!t) throw new Error('Ticket not found')
    return t
  },

  async createTicket(payload: Partial<Ticket>) {
    await sleep(300)
    const id = uuidv4()
    const now = new Date().toISOString()
    const ticket: Ticket = {
      id,
      title: payload.title || 'Untitled',
      description: payload.description || '',
      software_name: payload.software_name || '',
      software_version: payload.software_version || '',
      discovered_at: payload.discovered_at || now,
      severity: (payload.severity as any) || 'NORMAL',
      module: payload.module,
      current_status: 'OPEN',
      submitter: payload.submitter,
      assignee: payload.assignee,
      created_at: now,
      updated_at: now
    }
    mock.tickets.unshift(ticket)
    return ticket
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

  async listUsers() {
    await sleep(100)
    return mock.users
  }
}
