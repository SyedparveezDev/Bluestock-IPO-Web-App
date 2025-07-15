import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface IPOCardProps {
  logo?: string
  companyName: string
  priceBand: string
  open: string
  close: string
  issueSize: string
  issueType: string
  listingDate: string
  logoColor?: string
  companyColor?: string
}

function IPOCard({
  logo,
  companyName,
  priceBand,
  open,
  close,
  issueSize,
  issueType,
  listingDate,
  logoColor = "#666",
  companyColor = "#4F46E5",
}: IPOCardProps) {
  return (
    <Card className="bg-gray-50 border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          {logo ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-lg font-bold" style={{ color: logoColor }}>
                {logo}
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          )}
          <span className="text-sm font-medium" style={{ color: companyColor }}>
            {companyName}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <div className="text-gray-500 mb-1">PRICE BAND</div>
            <div className="font-medium">{priceBand}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">OPEN</div>
            <div className="font-medium">{open}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">CLOSE</div>
            <div className="font-medium">{close}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <div className="text-gray-500 mb-1">ISSUE SIZE</div>
            <div className="font-medium">{issueSize}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">ISSUE TYPE</div>
            <div className="font-medium">{issueType}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">LISTING DATE</div>
            <div className="font-medium">{listingDate}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
            RHP
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            DRHP
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const currentIPOs = [
    {
      logo: "OLA",
      companyName: "OLA Electric Mobility Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#000",
      companyColor: "#4F46E5",
    },
    {
      logo: "M",
      companyName: "One Mobikwik Systems Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "1900 Cr.",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#4F46E5",
      companyColor: "#4F46E5",
    },
    {
      logo: "ixigo",
      companyName: "Le Travenues Technology",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "1800 Cr.",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#FF6B35",
      companyColor: "#4F46E5",
    },
    {
      logo: "CMR",
      companyName: "CMR Green Technologies",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#8B5A3C",
      companyColor: "#4F46E5",
    },
    {
      logo: "W",
      companyName: "Wellness Forever",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#22C55E",
      companyColor: "#4F46E5",
    },
    {
      logo: "PKH",
      companyName: "PKH Ventures Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#8B5A3C",
      companyColor: "#4F46E5",
    },
  ]

  const upcomingIPOs = [
    {
      logo: "NOVA",
      companyName: "Nova Agritech Ltd.",
      priceBand: "Rs 39 - 41",
      open: "2024-01-22",
      close: "2024-01-24",
      issueSize: "Rs 38 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-30",
      logoColor: "#4F46E5",
      companyColor: "#4F46E5",
    },
    {
      logo: "E",
      companyName: "EPACK Durable Ltd.",
      priceBand: "Rs 218 - 230",
      open: "2024-01-19",
      close: "2024-01-23",
      issueSize: "Rs 640.05 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-29",
      logoColor: "#4F46E5",
      companyColor: "#4F46E5",
    },
    {
      logo: "RK",
      companyName: "RK Swamy Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#DC2626",
      companyColor: "#4F46E5",
    },
    {
      logo: "OYO",
      companyName: "Oravel Stays Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Rs 8430 Cr.",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#DC2626",
      companyColor: "#4F46E5",
    },
    {
      logo: "boat",
      companyName: "Imagine marketing Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Rs 2000 Cr.",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#000",
      companyColor: "#4F46E5",
    },
    {
      logo: "K",
      companyName: "Kids Clinic India Ltd.",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued",
      logoColor: "#EC4899",
      companyColor: "#4F46E5",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="text-blue-600">Bluestock</span>
          <span>{">"}</span>
          <span>IPO UPCOMING IPO</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming IPO</h1>
        <p className="text-gray-600 text-sm">
          Companies that have filed for an IPO with Sebi but dates might not be disclosed by the companies/AMC
        </p>
      </div>

      {/* Current IPOs Grid */}
      <div className="border-2 border-blue-400 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentIPOs.map((ipo, index) => (
            <IPOCard key={index} {...ipo} />
          ))}
        </div>
      </div>

      {/* Upcoming IPOs Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming IPO</h2>
        <p className="text-gray-600 text-sm mb-6">
          Companies that have filed for an IPO with Sebi but dates might not be disclosed by the companies/AMC
        </p>
      </div>

      {/* Upcoming IPOs Grid */}
      <div className="border-2 border-blue-400 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingIPOs.map((ipo, index) => (
            <IPOCard key={index} {...ipo} />
          ))}
        </div>
      </div>
    </div>
  )
}
