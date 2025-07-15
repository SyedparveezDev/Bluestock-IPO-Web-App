"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import type { IPO } from "../types/ipo"

interface IPOCardProps {
  ipo: IPO
  onViewDetails: (id: number) => void
}

export function IPOCard({ ipo, onViewDetails }: IPOCardProps) {
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
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card className="bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {ipo.logo || ipo.company_name.charAt(0)}
            </div>
            <div>
              <h3
                className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => onViewDetails(ipo.id)}
              >
                {ipo.company_name}
              </h3>
              <Badge className={`text-xs ${getStatusColor(ipo.status)}`}>{ipo.status.toUpperCase()}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <div className="text-gray-500 mb-1">PRICE BAND</div>
            <div className="font-medium">{ipo.price_band}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">OPEN</div>
            <div className="font-medium">{formatDate(ipo.open_date)}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">CLOSE</div>
            <div className="font-medium">{formatDate(ipo.close_date)}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <div className="text-gray-500 mb-1">ISSUE SIZE</div>
            <div className="font-medium">{ipo.issue_size}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">ISSUE TYPE</div>
            <div className="font-medium">{ipo.issue_type}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">LISTING DATE</div>
            <div className="font-medium">{ipo.listing_date ? formatDate(ipo.listing_date) : "TBA"}</div>
          </div>
        </div>

        {ipo.status === "listed" && (
          <div className="grid grid-cols-2 gap-4 text-xs mb-4 p-2 bg-white rounded">
            <div>
              <div className="text-gray-500 mb-1">LISTING GAIN</div>
              <div
                className={`font-medium flex items-center gap-1 ${
                  (ipo.listing_gain || 0) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {(ipo.listing_gain || 0) >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {ipo.listing_gain?.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">CURRENT RETURN</div>
              <div
                className={`font-medium flex items-center gap-1 ${
                  (ipo.current_return || 0) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {(ipo.current_return || 0) >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {ipo.current_return?.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent flex-1"
            onClick={() => window.open(ipo.rhp_pdf, "_blank")}
          >
            <Download className="w-3 h-3 mr-1" />
            RHP
          </Button>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
            onClick={() => window.open(ipo.drhp_pdf, "_blank")}
          >
            <Download className="w-3 h-3 mr-1" />
            DRHP
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
