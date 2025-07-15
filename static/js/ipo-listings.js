// IPO Listings Page JavaScript

// Declare necessary variables
const utils = {
  debounce: (func, wait) => {
    let timeout
    return function (...args) {
      
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  },
  getCompanyLogo: (ipo) => {
    // Placeholder for company logo logic
    return `<img src="${ipo.logo_url}" alt="${ipo.company_name} Logo" class="company-logo">`
  },
  getStatusBadge: (status) => {
    // Placeholder for status badge logic
    return `<span class="badge bg-${status === "listed" ? "success" : status === "ongoing" ? "warning" : "info"}">${status.toUpperCase()}</span>`
  },
  formatDate: (date) => {
    // Placeholder for date formatting logic
    return new Date(date).toLocaleDateString()
  },
  showLoading: (containerId) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = `<div class="text-center py-5"><i class="bi bi-hourglass-split display-1 text-muted"></i><h4 class="mt-3">Loading...</h4></div>`
    }
  },
  showError: (containerId, message = "An error occurred.") => {
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = `<div class="text-center py-5"><i class="bi bi-exclamation-triangle display-1 text-danger"></i><h4 class="mt-3">${message}</h4></div>`
    }
  },
}

const apiService = {
  getStats: async () => {
    // Placeholder for API call to get stats
    return new Promise((resolve) => {
      resolve({
        total_ipos: 100,
        upcoming: 20,
        ongoing: 30,
        listed: 50,
      })
    })
  },
  getIPOs: async (filters) => {
    // Placeholder for API call to get IPOs
    return new Promise((resolve) => {
      resolve({
        results: [
          {
            id: 1,
            company_name: "Company A",
            status: "listed",
            listing_gain: 10.5,
            current_return: 8.2,
            price_band: "100-200",
            open_date: "2022-01-01",
            close_date: "2022-01-10",
            listing_date: "2022-01-15",
            ipo_price: 150,
            listing_price: 165,
            current_market_price: 180,
            rhp_pdf: "https://example.com/rhp.pdf",
            drhp_pdf: "https://example.com/drhp.pdf",
            logo_url: "https://example.com/logo.png",
          },
          {
            id: 2,
            company_name: "Company B",
            status: "upcoming",
            price_band: "200-300",
            open_date: "2022-02-01",
            close_date: "2022-02-10",
            listing_date: null,
            rhp_pdf: "https://example.com/rhp.pdf",
            drhp_pdf: "https://example.com/drhp.pdf",
            logo_url: "https://example.com/logo.png",
          },
        ],
      })
    })
  },
  getIPO: async (ipoId) => {
    // Placeholder for API call to get a single IPO
    return new Promise((resolve) => {
      resolve({
        id: ipoId,
        company_name: "Company A",
        status: "listed",
        listing_gain: 10.5,
        current_return: 8.2,
        price_band: "100-200",
        open_date: "2022-01-01",
        close_date: "2022-01-10",
        listing_date: "2022-01-15",
        ipo_price: 150,
        listing_price: 165,
        current_market_price: 180,
        rhp_pdf: "https://example.com/rhp.pdf",
        drhp_pdf: "https://example.com/drhp.pdf",
        logo_url: "https://example.com/logo.png",
      })
    })
  },
}

const bootstrap = {
  Modal: function (element) {
    // Placeholder for Bootstrap Modal logic
    this.show = () => {
      element.style.display = "block"
    }
  },
}

class IPOListings {
  constructor() {
    this.currentFilters = {}
    this.allIPOs = []
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadIPOStats()
    this.loadAllIPOs()
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        utils.debounce((e) => this.handleSearch(e.target.value), 300),
      )
    }

    // Status filter
    const statusFilter = document.getElementById("statusFilter")
    if (statusFilter) {
      statusFilter.addEventListener("change", (e) => this.handleStatusFilter(e.target.value))
    }

    // Sort by
    const sortBy = document.getElementById("sortBy")
    if (sortBy) {
      sortBy.addEventListener("change", (e) => this.handleSort(e.target.value))
    }

    // Tab change events
    const tabButtons = document.querySelectorAll('#ipoTabs button[data-bs-toggle="tab"]')
    tabButtons.forEach((button) => {
      button.addEventListener("shown.bs.tab", (e) => {
        const target = e.target.getAttribute("data-bs-target")
        this.handleTabChange(target)
      })
    })
  }

  async loadIPOStats() {
    try {
      const stats = await apiService.getStats()
      this.updateStatsDisplay(stats)
      this.updateTabCounts(stats)
    } catch (error) {
      console.error("Failed to load IPO stats:", error)
    }
  }

  updateStatsDisplay(stats) {
    const statsContainer = document.getElementById("statsContainer")
    if (!statsContainer) return

    statsContainer.innerHTML = `
            <div class="col-md-3">
                <div class="stats-card bg-primary">
                    <h3>${stats.total_ipos}</h3>
                    <p>Total IPOs</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card bg-info">
                    <h3>${stats.upcoming}</h3>
                    <p>Upcoming</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card bg-success">
                    <h3>${stats.ongoing}</h3>
                    <p>Ongoing</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card bg-secondary">
                    <h3>${stats.listed}</h3>
                    <p>Listed</p>
                </div>
            </div>
        `
  }

  updateTabCounts(stats) {
    document.getElementById("allCount").textContent = stats.total_ipos
    document.getElementById("upcomingCount").textContent = stats.upcoming
    document.getElementById("ongoingCount").textContent = stats.ongoing
    document.getElementById("listedCount").textContent = stats.listed
  }

  async loadAllIPOs() {
    try {
      utils.showLoading("allIPOsContainer")
      const response = await apiService.getIPOs(this.currentFilters)
      this.allIPOs = response.results || response
      this.displayIPOs(this.allIPOs, "allIPOsContainer")
      this.loadCategorizedIPOs()
    } catch (error) {
      console.error("Failed to load IPOs:", error)
      utils.showError("allIPOsContainer")
    }
  }

  async loadCategorizedIPOs() {
    // Load upcoming IPOs
    const upcomingIPOs = this.allIPOs.filter((ipo) => ipo.status === "upcoming")
    this.displayIPOs(upcomingIPOs, "upcomingIPOsContainer")

    // Load ongoing IPOs
    const ongoingIPOs = this.allIPOs.filter((ipo) => ipo.status === "ongoing")
    this.displayIPOs(ongoingIPOs, "ongoingIPOsContainer")

    // Load listed IPOs
    const listedIPOs = this.allIPOs.filter((ipo) => ipo.status === "listed")
    this.displayIPOs(listedIPOs, "listedIPOsContainer")
  }

  displayIPOs(ipos, containerId) {
    const container = document.getElementById(containerId)
    if (!container) return

    if (ipos.length === 0) {
      container.innerHTML = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-inbox display-1 text-muted"></i>
                        <h4 class="mt-3">No IPOs Found</h4>
                        <p class="text-muted">No IPOs match your current criteria.</p>
                    </div>
                </div>
            `
      return
    }

    container.innerHTML = ipos.map((ipo) => this.createIPOCard(ipo)).join("")
  }

  createIPOCard(ipo) {
    const performanceSection =
      ipo.status === "listed"
        ? `
            <div class="row mt-3">
                <div class="col-6">
                    <small class="text-muted">LISTING GAIN</small>
                    <div class="fw-bold ${ipo.listing_gain >= 0 ? "performance-positive" : "performance-negative"}">
                        <i class="bi bi-${ipo.listing_gain >= 0 ? "arrow-up" : "arrow-down"}"></i>
                        ${ipo.listing_gain ? ipo.listing_gain.toFixed(2) : "0.00"}%
                    </div>
                </div>
                <div class="col-6">
                    <small class="text-muted">CURRENT RETURN</small>
                    <div class="fw-bold ${ipo.current_return >= 0 ? "performance-positive" : "performance-negative"}">
                        <i class="bi bi-${ipo.current_return >= 0 ? "arrow-up" : "arrow-down"}"></i>
                        ${ipo.current_return ? ipo.current_return.toFixed(2) : "0.00"}%
                    </div>
                </div>
            </div>
        `
        : ""

    return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card ipo-card h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            ${utils.getCompanyLogo(ipo)}
                            <div class="ms-3 flex-grow-1">
                                <h6 class="card-title mb-1">
                                    <a href="#" class="text-decoration-none text-primary" 
                                       onclick="ipoListings.showIPODetails(${ipo.id})">
                                        ${ipo.company_name}
                                    </a>
                                </h6>
                                ${utils.getStatusBadge(ipo.status)}
                            </div>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-4">
                                <small class="text-muted">PRICE BAND</small>
                                <div class="fw-bold small">${ipo.price_band}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">OPEN</small>
                                <div class="fw-bold small">${utils.formatDate(ipo.open_date)}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">CLOSE</small>
                                <div class="fw-bold small">${utils.formatDate(ipo.close_date)}</div>
                            </div>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-4">
                                <small class="text-muted">ISSUE SIZE</small>
                                <div class="fw-bold small">${ipo.issue_size}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">ISSUE TYPE</small>
                                <div class="fw-bold small">${ipo.issue_type.replace("_", " ").toUpperCase()}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">LISTING</small>
                                <div class="fw-bold small">${ipo.listing_date ? utils.formatDate(ipo.listing_date) : "TBA"}</div>
                            </div>
                        </div>

                        ${performanceSection}

                        <div class="d-flex gap-2 mt-3">
                            <button class="btn btn-rhp btn-sm flex-fill" onclick="window.open('${ipo.rhp_pdf || "#"}', '_blank')">
                                <i class="bi bi-download"></i> RHP
                            </button>
                            <button class="btn btn-drhp btn-sm flex-fill" onclick="window.open('${ipo.drhp_pdf || "#"}', '_blank')">
                                <i class="bi bi-download"></i> DRHP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  async showIPODetails(ipoId) {
    try {
      const ipo = await apiService.getIPO(ipoId)
      this.displayIPOModal(ipo)
    } catch (error) {
      console.error("Failed to load IPO details:", error)
      utils.showError("modalBody", "Failed to load IPO details.")
    }
  }

  displayIPOModal(ipo) {
    const modal = new bootstrap.Modal(document.getElementById("ipoDetailModal"))
    document.getElementById("modalTitle").textContent = ipo.company_name

    const modalBody = document.getElementById("modalBody")
    modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <h6>Basic Information</h6>
                    <table class="table table-sm">
                        <tr><td>Price Band:</td><td>${ipo.price_band}</td></tr>
                        <tr><td>Issue Size:</td><td>${ipo.issue_size}</td></tr>
                        <tr><td>Issue Type:</td><td>${ipo.issue_type.replace("_", " ")}</td></tr>
                        <tr><td>Status:</td><td>${utils.getStatusBadge(ipo.status)}</td></tr>
                    </table>
                </div>
                <div class="col-md-4">
                    <h6>Timeline</h6>
                    <table class="table table-sm">
                        <tr><td>Open Date:</td><td>${utils.formatDate(ipo.open_date)}</td></tr>
                        <tr><td>Close Date:</td><td>${utils.formatDate(ipo.close_date)}</td></tr>
                        <tr><td>Listing Date:</td><td>${ipo.listing_date ? utils.formatDate(ipo.listing_date) : "TBA"}</td></tr>
                    </table>
                </div>
                ${
                  ipo.status === "listed"
                    ? `
                <div class="col-md-4">
                    <h6>Performance</h6>
                    <table class="table table-sm">
                        <tr><td>IPO Price:</td><td>₹${ipo.ipo_price}</td></tr>
                        <tr><td>Listing Price:</td><td>₹${ipo.listing_price}</td></tr>
                        <tr><td>Current Price:</td><td>₹${ipo.current_market_price}</td></tr>
                        <tr><td>Listing Gain:</td><td class="${ipo.listing_gain >= 0 ? "performance-positive" : "performance-negative"}">${ipo.listing_gain}%</td></tr>
                        <tr><td>Current Return:</td><td class="${ipo.current_return >= 0 ? "performance-positive" : "performance-negative"}">${ipo.current_return}%</td></tr>
                    </table>
                </div>
                `
                    : ""
                }
            </div>
            <div class="mt-4">
                <h6>Documents</h6>
                <div class="d-flex gap-2">
                    <a href="${ipo.rhp_pdf || "#"}" class="btn btn-rhp" target="_blank">
                        <i class="bi bi-download"></i> Download RHP
                    </a>
                    <a href="${ipo.drhp_pdf || "#"}" class="btn btn-drhp" target="_blank">
                        <i class="bi bi-download"></i> Download DRHP
                    </a>
                </div>
            </div>
        `

    modal.show()
  }

  handleSearch(searchTerm) {
    this.currentFilters.search = searchTerm
    this.loadAllIPOs()
  }

  handleStatusFilter(status) {
    if (status) {
      this.currentFilters.status = status
    } else {
      delete this.currentFilters.status
    }
    this.loadAllIPOs()
  }

  handleSort(sortBy) {
    this.currentFilters.ordering = sortBy
    this.loadAllIPOs()
  }

  handleTabChange(target) {
    // Tab-specific logic can be added here if needed
    console.log("Tab changed to:", target)
  }
}

// Initialize IPO Listings when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.ipoListings = new IPOListings()
})
