import { type NextRequest, NextResponse } from "next/server"
import { mockIPOData } from "../../lib/mock-data"

// GET /api/ipo - List all IPOs with filtering and search
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")
  const sortBy = searchParams.get("sortBy")

  let filteredIPOs = [...mockIPOData]

  // Filter by status
  if (status && status !== "all") {
    filteredIPOs = filteredIPOs.filter((ipo) => ipo.status === status)
  }

  // Filter by search
  if (search) {
    filteredIPOs = filteredIPOs.filter((ipo) => ipo.company_name.toLowerCase().includes(search.toLowerCase()))
  }

  // Sort
  if (sortBy) {
    filteredIPOs.sort((a, b) => {
      switch (sortBy) {
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

  return NextResponse.json({
    success: true,
    data: filteredIPOs,
    count: filteredIPOs.length,
  })
}

// POST /api/ipo - Create new IPO (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real application, you would:
    // 1. Validate the request body
    // 2. Check authentication/authorization
    // 3. Save to database
    // 4. Return the created IPO

    const newIPO = {
      id: Math.max(...mockIPOData.map((i) => i.id)) + 1,
      ...body,
      listing_gain:
        body.ipo_price && body.listing_price ? ((body.listing_price - body.ipo_price) / body.ipo_price) * 100 : null,
      current_return:
        body.ipo_price && body.current_market_price
          ? ((body.current_market_price - body.ipo_price) / body.ipo_price) * 100
          : null,
    }

    return NextResponse.json({
      success: true,
      data: newIPO,
      message: "IPO created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create IPO",
      },
      { status: 500 },
    )
  }
}
