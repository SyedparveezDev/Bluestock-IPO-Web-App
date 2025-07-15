"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IPOCard } from "../components/ipo-card"
import { IPOFiltersComponent } from "../components/ipo-filters"
import { IPODetailModal } from "../components/ipo-detail-modal"
import { AdminPanel } from "../components/admin-panel"
import { mockIPOData } from "../lib/mock-data"
import type { IPO, IPOFilters } from "../types/ipo"
import { Settings } from "lucide-react"

export default function Component() {
  const [ipos, setIpos] = useState<IPO[]>(mockIPOData)
  const [filters, setFilters] = useState<IPOFilters>({})
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)

  const filteredIPOs = useMemo(() => {
    let filtered = [...ipos]

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter((ipo) => ipo.company_name.toLowerCase().includes(filters.search!.toLowerCase()))
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((ipo) => ipo.status === filters.status)
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "name":
            return a.company_name.localeCompare(b.company_name)
          case "open_date":
            return new Date(a.open_date).getTime() - new Date(b.open_date).getTime()
          case "issue_size":
            return a.issue_size.localeCompare(b.issue_size)
          case "listing_gain":
            return (b.listing_gain || 0) - (a.listing_gain || 0)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [ipos, filters])

  const upcomingIPOs = filteredIPOs.filter((ipo) => ipo.status === "upcoming")
  const ongoingIPOs = filteredIPOs.filter((ipo) => ipo.status === "ongoing")
  const listedIPOs = filteredIPOs.filter((ipo) => ipo.status === "listed")

  const handleViewDetails = (id: number) => {
    const ipo = ipos.find((i) => i.id === id)
    setSelectedIPO(ipo || null)
  }

  const handleAddIPO = (newIPO: Omit<IPO, "id">) => {
    const id = Math.max(...ipos.map((i) => i.id)) + 1
    setIpos([...ipos, { ...newIPO, id }])
  }

  const handleUpdateIPO = (id: number, updatedIPO: Partial<IPO>) => {
    setIpos(ipos.map((ipo) => (ipo.id === id ? { ...ipo, ...updatedIPO } : ipo)))
  }

  const handleDeleteIPO = (id: number) => {
    setIpos(ipos.filter((ipo) => ipo.id !== id))
  }

  if (showAdmin) {
    return (
      <div>
        <div className="bg-white border-b p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">BLUESTOCK Admin</h1>
            <Button variant="outline" onClick={() => setShowAdmin(false)}>
              Back to Public View
            </Button>
          </div>
        </div>
        <AdminPanel ipos={ipos} onAddIPO={handleAddIPO} onUpdateIPO={handleUpdateIPO} onDeleteIPO={handleDeleteIPO} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 transform rotate-45 rounded-sm"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-500 transform rotate-12 rounded-sm"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-purple-600 to-blue-700 transform -rotate-12 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-900 ml-2">BLUESTOCK</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAdmin(true)} className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin Panel
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span className="text-blue-600">Bluestock</span>
          <span>{">"}</span>
          <span>IPO LISTINGS</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IPO Listings</h1>
          <p className="text-gray-600">
            Comprehensive IPO information including upcoming, ongoing, and listed companies with real-time data and
            downloadable documents.
          </p>
        </div>

        {/* Filters */}
        <IPOFiltersComponent filters={filters} onFiltersChange={setFilters} />

        {/* IPO Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All IPOs ({filteredIPOs.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingIPOs.length})</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing ({ongoingIPOs.length})</TabsTrigger>
            <TabsTrigger value="listed">Listed ({listedIPOs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIPOs.map((ipo) => (
                <IPOCard key={ipo.id} ipo={ipo} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingIPOs.map((ipo) => (
                <IPOCard key={ipo.id} ipo={ipo} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingIPOs.map((ipo) => (
                <IPOCard key={ipo.id} ipo={ipo} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="listed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listedIPOs.map((ipo) => (
                <IPOCard key={ipo.id} ipo={ipo} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredIPOs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No IPOs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* IPO Detail Modal */}
      <IPODetailModal ipo={selectedIPO} isOpen={!!selectedIPO} onClose={() => setSelectedIPO(null)} />
    </div>
  )
}
