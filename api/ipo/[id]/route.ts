import { type NextRequest, NextResponse } from "next/server"
import { mockIPOData } from "../../../lib/mock-data"

// GET /api/ipo/[id] - Get specific IPO details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const ipo = mockIPOData.find((i) => i.id === id)

  if (!ipo) {
    return NextResponse.json(
      {
        success: false,
        message: "IPO not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: ipo,
  })
}

// PUT /api/ipo/[id] - Update IPO (Admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // In a real application, you would:
    // 1. Validate the request body
    // 2. Check authentication/authorization
    // 3. Update in database
    // 4. Return the updated IPO

    const updatedIPO = {
      id,
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
      data: updatedIPO,
      message: "IPO updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update IPO",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/ipo/[id] - Delete IPO (Admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // In a real application, you would:
    // 1. Check authentication/authorization
    // 2. Delete from database
    // 3. Return success message

    return NextResponse.json({
      success: true,
      message: "IPO deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete IPO",
      },
      { status: 500 },
    )
  }
}
