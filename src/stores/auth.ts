import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from './toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        checked: false
    }),

    actions: {
        async login(email: string, password: string) {
            const toastStore = useToastStore()

            try {
                const response = await api.post('/api/login', { email, password })
                const token = response.data.token

                localStorage.setItem('token', token)
                await this.fetchUser(token)

                toastStore.success('Welcome back!', 'You have been logged in successfully')
                return { success: true }
            } catch (error: any) {
                if (error.response?.status === 422) {
                    // toastStore.error('Validation Error', 'Please check your input')
                    return { success: false, errors: error.response.data.errors }
                }

                if (error.response?.status === 401) {
                    // toastStore.error('Login Failed', 'Invalid email or password')
                    return { success: false, errors: { email: [error.response.data.message] } }
                }

                toastStore.error('Login Failed', 'Something went wrong. Please try again.')
                return {
                    success: false,
                    errors: { email: ['Something went wrong. Please try again.'] }
                }
            }
        },

        async logout() {
            const toastStore = useToastStore()

            try {
                const token = localStorage.getItem('token')
                if (token) {
                    await api.post('/api/logout', {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                }
                toastStore.success('Logged out', 'You have been signed out successfully')
            } catch {
                toastStore.warning('Logged out', 'Session ended (server unreachable)')
            }

            this.user = null
            this.checked = false
            localStorage.removeItem('token')
        },

        async fetchUser(token: string) {
            try {
                const response = await api.get('/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                this.user = response.data
                this.checked = true
                return true
            } catch {
                this.user = null
                this.checked = true
                return false
            }
        }
    }
})