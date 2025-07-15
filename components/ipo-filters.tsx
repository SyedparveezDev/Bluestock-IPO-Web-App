"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import type { IPOFilters } from "../types/ipo"

interface IPOFiltersProps {
  filters: IPOFilters
  onFiltersChange: (filters: IPOFilters) => void
}

export function IPOFiltersComponent({ filters, onFiltersChange }: IPOFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search IPOs by company name..."
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.status || "all"}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value === "all" ? undefined : value })}
        >
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="listed">Listed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy || "name"}
          onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Company Name</SelectItem>
            <SelectItem value="open_date">Open Date</SelectItem>
            <SelectItem value="issue_size">Issue Size</SelectItem>
            <SelectItem value="listing_gain">Listing Gain</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
