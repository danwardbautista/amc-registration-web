import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from './toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export interface Registrant {
    id: number
    prefix?: string
    first_name: string
    last_name: string
    mobile_number: string
    email: string
    created_at: string
    updated_at: string
    deleted_at?: string
}

export interface RegistrantForm {
    prefix?: string
    first_name: string
    last_name: string
    mobile_number: string
    email: string
}

export interface RegistrationFilters {
    search?: string
    sort_by?: string
    sort_order?: 'asc' | 'desc'
    per_page?: number
    page?: number
}

export interface PaginatedResponse {
    data: Registrant[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
}

export const useRegistrationStore = defineStore('registration', {
    state: () => ({
        registrants: [] as Registrant[],
        currentRegistrant: null as Registrant | null,
        pagination: null as PaginatedResponse | null,
        loading: false
    }),

    actions: {
        getAuthHeaders() {
            const token = localStorage.getItem('token')
            return token ? { Authorization: `Bearer ${token}` } : {}
        },

        async getAllRegistrants(filters: RegistrationFilters = {}) {
            const toastStore = useToastStore()
            this.loading = true

            try {
                const response = await api.get('/api/registration', {
                    headers: this.getAuthHeaders(),
                    params: filters
                })

                this.pagination = response.data.results
                this.registrants = response.data.results.data
                return { success: true, data: response.data.results }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    toastStore.error('Unauthorized', 'Please log in to access this data')
                    return { success: false, errors: { auth: ['Unauthorized access'] } }
                }

                if (error.response?.status === 422) {
                    toastStore.error('Invalid Parameters', 'Please check your search filters')
                    return { success: false, errors: error.response.data.errors }
                }

                toastStore.error('Failed to Load', 'Unable to retrieve registrants')
                return { success: false, errors: { general: ['Failed to load data'] } }
            } finally {
                this.loading = false
            }
        },

        async getRegistrantById(id: number) {
            const toastStore = useToastStore()
            this.loading = true

            try {
                const response = await api.get(`/api/registration/${id}`, {
                    headers: this.getAuthHeaders()
                })

                this.currentRegistrant = response.data.data
                return { success: true, data: response.data.data }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    toastStore.error('Not Found', 'Registrant not found')
                    return { success: false, errors: { id: ['Registrant not found'] } }
                }

                if (error.response?.status === 401) {
                    toastStore.error('Unauthorized', 'Please log in to access this data')
                    return { success: false, errors: { auth: ['Unauthorized access'] } }
                }

                toastStore.error('Failed to Load', 'Unable to retrieve registrant details')
                return { success: false, errors: { general: ['Failed to load data'] } }
            } finally {
                this.loading = false
            }
        },

        async createRegistrant(registrantData: RegistrantForm) {
            const toastStore = useToastStore()
            this.loading = true

            try {
                const response = await api.post('/api/registration', registrantData, {
                    headers: this.getAuthHeaders()
                })

                this.registrants.unshift(response.data.data)

                toastStore.success('Success!', 'Registrant created successfully')
                return { success: true, data: response.data.data }
            } catch (error: any) {
                if (error.response?.status === 422) {
                    // Don't show toast for validation errors
                    return { success: false, errors: error.response.data.errors }
                }

                if (error.response?.status === 401) {
                    toastStore.error('Unauthorized', 'Please log in to create registrants')
                    return { success: false, errors: { auth: ['Unauthorized access'] } }
                }

                toastStore.error('Creation Failed', 'Unable to create registrant')
                return { success: false, errors: { general: ['Creation failed'] } }
            } finally {
                this.loading = false
            }
        },

        async updateRegistrant(id: number, registrantData: RegistrantForm) {
            const toastStore = useToastStore()
            this.loading = true

            try {
                const response = await api.put(`/api/registration/${id}`, registrantData, {
                    headers: this.getAuthHeaders()
                })

                const index = this.registrants.findIndex(r => r.id === id)
                if (index !== -1) {
                    this.registrants[index] = response.data.data
                }

                if (this.currentRegistrant?.id === id) {
                    this.currentRegistrant = response.data.data
                }

                toastStore.success('Success!', 'Registrant updated successfully')
                return { success: true, data: response.data.data }
            } catch (error: any) {

                if (error.response?.status === 422) {
                    return { success: false, errors: error.response.data.errors }
                }

                if (error.response?.status === 404) {
                    toastStore.error('Not Found', 'Registrant not found')
                    return { success: false, errors: { id: ['Registrant not found'] } }
                }

                if (error.response?.status === 401) {
                    toastStore.error('Unauthorized', 'Please log in to update registrants')
                    return { success: false, errors: { auth: ['Unauthorized access'] } }
                }

                toastStore.error('Update Failed', 'Unable to update registrant')
                return { success: false, errors: { general: ['Update failed'] } }
            } finally {
                this.loading = false
            }
        },

        async deleteRegistrant(id: number) {
            const toastStore = useToastStore()
            this.loading = true

            try {
                await api.delete(`/api/registration/${id}`, {
                    headers: this.getAuthHeaders()
                })

                this.registrants = this.registrants.filter(r => r.id !== id)

                if (this.currentRegistrant?.id === id) {
                    this.currentRegistrant = null
                }

                toastStore.success('Success!', 'Registrant deleted successfully')
                return { success: true }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    toastStore.error('Not Found', 'Registrant not found')
                    return { success: false, errors: { id: ['Registrant not found'] } }
                }

                if (error.response?.status === 401) {
                    toastStore.error('Unauthorized', 'Please log in to delete registrants')
                    return { success: false, errors: { auth: ['Unauthorized access'] } }
                }

                toastStore.error('Deletion Failed', 'Unable to delete registrant')
                return { success: false, errors: { general: ['Deletion failed'] } }
            } finally {
                this.loading = false
            }
        },

        async searchRegistrants(searchTerm: string, options: Omit<RegistrationFilters, 'search'> = {}) {
            return await this.getAllRegistrants({
                search: searchTerm,
                ...options
            })
        },

        async refreshRegistrants() {
            return await this.getAllRegistrants()
        },

        clearStore() {
            this.registrants = []
            this.currentRegistrant = null
            this.pagination = null
            this.loading = false
        }
    }
})