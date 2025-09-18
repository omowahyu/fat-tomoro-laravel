"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Plus, Save, X } from "lucide-react"

interface MappingItem {
  id: string
  source: string
  target: string
  status: "active" | "inactive" | "pending"
  confidence?: number
  lastUpdated: string
  updatedBy: string
}

interface MappingTableProps {
  title: string
  data: MappingItem[]
  sourceLabel: string
  targetLabel: string
  targetOptions: { value: string; label: string }[]
  onAdd?: (item: Omit<MappingItem, "id" | "lastUpdated" | "updatedBy">) => void
  onEdit?: (id: string, item: Partial<MappingItem>) => void
  onDelete?: (id: string) => void
}

export function MappingTable({
  title,
  data,
  sourceLabel,
  targetLabel,
  targetOptions,
  onAdd,
  onEdit,
  onDelete,
}: MappingTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<Partial<MappingItem>>({})
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Partial<MappingItem>>({})

  const handleEdit = (item: MappingItem) => {
    setEditingId(item.id)
    setEditingItem(item)
  }

  const handleSave = () => {
    if (editingId && onEdit) {
      onEdit(editingId, editingItem)
    }
    setEditingId(null)
    setEditingItem({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingItem({})
  }

  const handleAdd = () => {
    if (onAdd && newItem.source && newItem.target) {
      onAdd({
        source: newItem.source,
        target: newItem.target,
        status: newItem.status || "active",
        confidence: newItem.confidence,
      })
      setNewItem({})
      setIsAddDialogOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Mapping</DialogTitle>
                <DialogDescription>Create a new mapping entry</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{sourceLabel}</Label>
                  <Input
                    value={newItem.source || ""}
                    onChange={(e) => setNewItem({ ...newItem, source: e.target.value })}
                    placeholder={`Enter ${sourceLabel.toLowerCase()}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{targetLabel}</Label>
                  <Select
                    value={newItem.target || ""}
                    onValueChange={(value) => setNewItem({ ...newItem, target: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${targetLabel.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {targetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newItem.status || "active"}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, status: value as "active" | "inactive" | "pending" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Mapping</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{sourceLabel}</TableHead>
                <TableHead>{targetLabel}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Updated By</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editingItem.source || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, source: e.target.value })}
                      />
                    ) : (
                      item.source
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Select
                        value={editingItem.target || ""}
                        onValueChange={(value) => setEditingItem({ ...editingItem, target: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {targetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      item.target
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Select
                        value={editingItem.status || ""}
                        onValueChange={(value) => setEditingItem({ ...editingItem, status: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={
                          item.status === "active" ? "default" : item.status === "pending" ? "secondary" : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.confidence && (
                      <Badge variant="secondary" className="text-xs">
                        {item.confidence}%
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.lastUpdated}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.updatedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {editingId === item.id ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete?.(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
