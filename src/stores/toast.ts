import { defineStore } from 'pinia'

export interface Toast {
  id: string
  title: string
  message?: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),

  actions: {
    addToast(toast: Omit<Toast, 'id'>) {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: Toast = {
        id,
        duration: 4000,
        ...toast
      }
      
      this.toasts.push(newToast)
      
      // Auto remove after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, newToast.duration)
      }
      
      return id
    },

    removeToast(id: string) {
      const index = this.toasts.findIndex(toast => toast.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },

    // Convenience methods
    success(title: string, message?: string, duration?: number) {
      return this.addToast({ title, message, type: 'success', duration })
    },

    error(title: string, message?: string, duration?: number) {
      return this.addToast({ title, message, type: 'error', duration })
    },

    info(title: string, message?: string, duration?: number) {
      return this.addToast({ title, message, type: 'info', duration })
    },

    warning(title: string, message?: string, duration?: number) {
      return this.addToast({ title, message, type: 'warning', duration })
    }
  }
})