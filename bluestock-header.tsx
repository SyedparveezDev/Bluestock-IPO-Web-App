import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 transform rotate-45 rounded-sm"></div>
              <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-500 transform rotate-12 rounded-sm"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-purple-600 to-blue-700 transform -rotate-12 rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900 ml-2">BLUESTOCK</span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              PRODUCTS
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              PRICING
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              COMMUNITY
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              MEDIA
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              SUPPORT
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2">Sign Up Now</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
