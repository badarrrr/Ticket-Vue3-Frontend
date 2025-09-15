
export type Role = 'TESTER' | 'DEVELOPER' | 'QA' | 'ADMIN'

export interface User {
  id: string
  username: string
  fullName?: string
  email?: string
  role: Role
}

export type Severity = 'HINT' | 'NORMAL' | 'SEVERE' | 'CRITICAL'

export type TicketStatus =
  | 'OPEN'
  | 'IN_DEVELOPMENT'
  | 'UNDER_REVIEW'
  | 'IN_REGRESSION'
  | 'CLOSED'
  | 'IN_MODIFICATION'
  | 'REOPENED'

export interface Ticket {
  id: string
  title: string
  description: string
  software_name: string
  software_version: string
  discovered_at: string
  severity: Severity
  module?: string
  current_status: TicketStatus
  submitter?: User
  assignee?: User
  qa_reviewer?: User
  regressor?: User
  created_at?: string
  updated_at?: string
}
