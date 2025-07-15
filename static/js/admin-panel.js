// Admin Panel JavaScript

// Declare variables before using them
const utils = window.utils // Assuming utils is a global object declared elsewhere
const apiService = window.apiService // Assuming apiService is a global object declared elsewhere
const bootstrap = window.bootstrap // Assuming bootstrap is a global object declared elsewhere

class AdminPanel {
  constructor() {
    this.currentIPO = null
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadIPOs()
  }

  setupEventListeners() {
    // Form submission
    const ipoForm = document.getElementById("ipoForm")
    if (ipoForm) {
      ipoForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // Modal events
    const addIPOModal = document.getElementById("addIPOModal")
    if (addIPOModal) {
      addIPOModal.addEventListener("hidden.bs.modal", () => this.resetForm())
    }
  }

  async loadIPOs() {
    try {
      utils.showLoading("ipoTableBody")
      const response = await apiService.getIPOs()
      const ipos = response.results || response
      this.displayIPOTable(ipos)
    } catch (error) {
      console.error("Failed to load IPOs:", error)
      utils.showError("ipoTableBody")
    }
  }

  displayIPOTable(ipos) {
    const tbody = document.getElementById("ipoTableBody")
    if (!tbody) return

    if (ipos.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <i class="bi bi-inbox display-6 text-muted"></i>
                        <p class="mt-2 mb-0">No IPOs found</p>
                    </td>
                </tr>
            `
      return
    }

    tbody.innerHTML = ipos
      .map(
        (ipo) => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        ${utils.getCompanyLogo(ipo)}
                        <div class="ms-2">
                            <div class="fw-bold">${ipo.company_name}</div>
                        </div>
                    </div>
                </td>
                <td>${utils.getStatusBadge(ipo.status)}</td>
                <td>${ipo.price_band}</td>
                <td>${utils.formatDate(ipo.open_date)}</td>
                <td>${utils.formatDate(ipo.close_date)}</td>
                <td>${ipo.issue_size}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="adminPanel.editIPO(${ipo.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="adminPanel.deleteIPO(${ipo.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  async handleFormSubmit(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    try {
      if (this.currentIPO) {
        await apiService.updateIPO(this.currentIPO.id, formData)
        utils.showSuccess("IPO updated successfully!")
      } else {
        await apiService.createIPO(formData)
        utils.showSuccess("IPO created successfully!")
      }

      // Close modal and reload data
      const modal = bootstrap.Modal.getInstance(document.getElementById("addIPOModal"))
      modal.hide()
      this.loadIPOs()
    } catch (error) {
      console.error("Failed to save IPO:", error)
      alert("Failed to save IPO. Please try again.")
    }
  }

  async editIPO(ipoId) {
    try {
      const ipo = await apiService.getIPO(ipoId)
      this.currentIPO = ipo
      this.populateForm(ipo)

      // Update modal title
      document.getElementById("modalTitle").textContent = "Edit IPO"

      // Show modal
      const modal = new bootstrap.Modal(document.getElementById("addIPOModal"))
      modal.show()
    } catch (error) {
      console.error("Failed to load IPO for editing:", error)
      alert("Failed to load IPO details.")
    }
  }

  populateForm(ipo) {
    const form = document.getElementById("ipoForm")
    if (!form) return

    // Populate text inputs
    const fields = [
      "company_name",
      "price_band",
      "issue_size",
      "open_date",
      "close_date",
      "listing_date",
      "status",
      "issue_type",
      "ipo_price",
      "listing_price",
      "current_market_price",
    ]

    fields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`)
      if (input && ipo[field] !== null && ipo[field] !== undefined) {
        input.value = ipo[field]
      }
    })
  }

  async deleteIPO(ipoId) {
    if (!confirm("Are you sure you want to delete this IPO? This action cannot be undone.")) {
      return
    }

    try {
      await apiService.deleteIPO(ipoId)
      utils.showSuccess("IPO deleted successfully!")
      this.loadIPOs()
    } catch (error) {
      console.error("Failed to delete IPO:", error)
      alert("Failed to delete IPO. Please try again.")
    }
  }

  resetForm() {
    this.currentIPO = null
    document.getElementById("modalTitle").textContent = "Add New IPO"
    document.getElementById("ipoForm").reset()
  }
}

// Initialize Admin Panel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.adminPanel = new AdminPanel()
})
