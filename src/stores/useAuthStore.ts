import { create } from 'zustand'

export type UserRole =
  | 'admin'
  | 'master'
  | 'director'
  | 'coordinator'
  | 'teacher'
  | 'parent'
  | 'student'
  | null

export interface User {
  name: string
  email: string
  role: UserRole
  avatar?: string
  childrenIds?: string[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
