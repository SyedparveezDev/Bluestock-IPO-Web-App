// Main JavaScript file for BLUESTOCK IPO Platform

// API Base URL
const API_BASE_URL = "/api"

// Utility Functions
const utils = {
  // Format date to Indian format
  formatDate: (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  },

  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  },

  // Get status badge HTML
  getStatusBadge: (status) => {
    const statusClasses = {
      upcoming: "status-upcoming",
      ongoing: "status-ongoing",
      listed: "status-listed",
    }

    return `<span class="status-badge ${statusClasses[status] || "status-listed"}">${status.toUpperCase()}</span>`
  },

  // Get company logo HTML
  getCompanyLogo: (ipo) => {
    if (ipo.logo && ipo.logo.startsWith("http")) {
      return `<img src="${ipo.logo}" alt="${ipo.company_name}" class="company-logo">`
    } else {
      const initials = ipo.company_name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 3)
      return `<div class="company-logo">${initials}</div>`
    }
  },

  // Show loading spinner
  showLoading: (containerId) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `
    }
  },

  // Show error message
  showError: (containerId, message = "An error occurred while loading data.") => {
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle"></i> ${message}
                </div>
            `
    }
  },

  // Show success message
  showSuccess: (message) => {
    const alertHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="bi bi-check-circle"></i> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `

    // Insert at the top of the page
    const container = document.querySelector(".container, .container-fluid")
    if (container) {
      container.insertAdjacentHTML("afterbegin", alertHtml)
    }
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
}

// API Service
const apiService = {
  // Generic API call
  async call(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API call failed:", error)
      throw error
    }
  },

  // Get all IPOs
  async getIPOs(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/ipo/?${queryString}` : "/ipo/"
    return await this.call(endpoint)
  },

  // Get IPO by ID
  async getIPO(id) {
    return await this.call(`/ipo/${id}/`)
  },

  // Get IPO statistics
  async getStats() {
    return await this.call("/ipo/stats/")
  },

  // Create IPO
  async createIPO(formData) {
    return await this.call("/ipo/", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },

  // Update IPO
  async updateIPO(id, formData) {
    return await this.call(`/ipo/${id}/`, {
      method: "PUT",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },

  // Delete IPO
  async deleteIPO(id) {
    return await this.call(`/ipo/${id}/`, {
      method: "DELETE",
    })
  },
}

// Global event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const bootstrap = window.bootstrap // Declare the bootstrap variable
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
})

// Export for use in other files
window.utils = utils
window.apiService = apiService
