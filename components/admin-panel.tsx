"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { IPO } from "../types/ipo"

interface AdminPanelProps {
  ipos: IPO[]
  onAddIPO: (ipo: Omit<IPO, "id">) => void
  onUpdateIPO: (id: number, ipo: Partial<IPO>) => void
  onDeleteIPO: (id: number) => void
}

export function AdminPanel({ ipos, onAddIPO, onUpdateIPO, onDeleteIPO }: AdminPanelProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingIPO, setEditingIPO] = useState<IPO | null>(null)
  const [formData, setFormData] = useState<Partial<IPO>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingIPO) {
      onUpdateIPO(editingIPO.id, formData)
      setEditingIPO(null)
    } else {
      onAddIPO(formData as Omit<IPO, "id">)
      setIsAddModalOpen(false)
    }
    setFormData({})
  }

  const resetForm = () => {
    setFormData({})
    setEditingIPO(null)
    setIsAddModalOpen(false)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">IPO Admin Panel</h1>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New IPO
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New IPO</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name || ""}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo">Logo Text</Label>
                    <Input
                      id="logo"
                      value={formData.logo || ""}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price_band">Price Band</Label>
                    <Input
                      id="price_band"
                      value={formData.price_band || ""}
                      onChange={(e) => setFormData({ ...formData, price_band: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue_size">Issue Size</Label>
                    <Input
                      id="issue_size"
                      value={formData.issue_size || ""}
                      onChange={(e) => setFormData({ ...formData, issue_size: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="open_date">Open Date</Label>
                    <Input
                      id="open_date"
                      type="date"
                      value={formData.open_date || ""}
                      onChange={(e) => setFormData({ ...formData, open_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="close_date">Close Date</Label>
                    <Input
                      id="close_date"
                      type="date"
                      value={formData.close_date || ""}
                      onChange={(e) => setFormData({ ...formData, close_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="listing_date">Listing Date</Label>
                    <Input
                      id="listing_date"
                      type="date"
                      value={formData.listing_date || ""}
                      onChange={(e) => setFormData({ ...formData, listing_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="listed">Listed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="issue_type">Issue Type</Label>
                    <Input
                      id="issue_type"
                      value={formData.issue_type || ""}
                      onChange={(e) => setFormData({ ...formData, issue_type: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {formData.status === "listed" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ipo_price">IPO Price</Label>
                      <Input
                        id="ipo_price"
                        type="number"
                        step="0.01"
                        value={formData.ipo_price || ""}
                        onChange={(e) => setFormData({ ...formData, ipo_price: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="listing_price">Listing Price</Label>
                      <Input
                        id="listing_price"
                        type="number"
                        step="0.01"
                        value={formData.listing_price || ""}
                        onChange={(e) => setFormData({ ...formData, listing_price: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current_market_price">Current Market Price</Label>
                      <Input
                        id="current_market_price"
                        type="number"
                        step="0.01"
                        value={formData.current_market_price || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, current_market_price: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add IPO
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {ipos.map((ipo) => (
            <Card key={ipo.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{ipo.company_name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingIPO(ipo)
                        setFormData(ipo)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteIPO(ipo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 font-medium">{ipo.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Price Band:</span>
                    <span className="ml-2 font-medium">{ipo.price_band}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Issue Size:</span>
                    <span className="ml-2 font-medium">{ipo.issue_size}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Open Date:</span>
                    <span className="ml-2 font-medium">{new Date(ipo.open_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingIPO} onOpenChange={() => setEditingIPO(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit IPO</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Same form fields as add modal */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_company_name">Company Name</Label>
                <Input
                  id="edit_company_name"
                  value={formData.company_name || ""}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_logo">Logo Text</Label>
                <Input
                  id="edit_logo"
                  value={formData.logo || ""}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditingIPO(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update IPO
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
