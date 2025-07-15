"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, TrendingDown, Calendar, DollarSign, FileText } from "lucide-react"
import type { IPO } from "../types/ipo"

interface IPODetailModalProps {
  ipo: IPO | null
  isOpen: boolean
  onClose: () => void
}

export function IPODetailModal({ ipo, isOpen, onClose }: IPODetailModalProps) {
  if (!ipo) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "listed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {ipo.logo || ipo.company_name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-xl">{ipo.company_name}</DialogTitle>
              <Badge className={`text-xs ${getStatusColor(ipo.status)} mt-1`}>{ipo.status.toUpperCase()}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Price Band</label>
                <p className="font-medium">{ipo.price_band}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Issue Size</label>
                <p className="font-medium">{ipo.issue_size}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Issue Type</label>
                <p className="font-medium">{ipo.issue_type}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Open Date</label>
                <p className="font-medium">{formatDate(ipo.open_date)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Close Date</label>
                <p className="font-medium">{formatDate(ipo.close_date)}</p>
              </div>
              {ipo.listing_date && (
                <div>
                  <label className="text-sm text-gray-500">Listing Date</label>
                  <p className="font-medium">{formatDate(ipo.listing_date)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Performance */}
          {ipo.status === "listed" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Performance
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">IPO Price</label>
                  <p className="font-medium">₹{ipo.ipo_price}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Listing Price</label>
                  <p className="font-medium">₹{ipo.listing_price}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Current Market Price</label>
                  <p className="font-medium">₹{ipo.current_market_price}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Listing Gain</label>
                  <p
                    className={`font-medium flex items-center gap-1 ${
                      (ipo.listing_gain || 0) >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {(ipo.listing_gain || 0) >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {ipo.listing_gain?.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Current Return</label>
                  <p
                    className={`font-medium flex items-center gap-1 ${
                      (ipo.current_return || 0) >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {(ipo.current_return || 0) >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {ipo.current_return?.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Documents</h3>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={() => window.open(ipo.rhp_pdf, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download RHP
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.open(ipo.drhp_pdf, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download DRHP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
