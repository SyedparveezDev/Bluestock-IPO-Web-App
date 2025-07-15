export interface IPO {
  id: number
  company_name: string
  logo?: string
  price_band: string
  open_date: string
  close_date: string
  issue_size: string
  issue_type: string
  listing_date?: string
  status: "upcoming" | "ongoing" | "listed"
  ipo_price?: number
  listing_price?: number
  current_market_price?: number
  rhp_pdf?: string
  drhp_pdf?: string
  listing_gain?: number
  current_return?: number
}

export interface IPOFilters {
  status?: string
  search?: string
  sortBy?: string
}
