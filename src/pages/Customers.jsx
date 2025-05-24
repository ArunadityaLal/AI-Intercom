"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreHorizontal, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

// Sample customer data
const sampleCustomers = [
  {
    id: "1",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Acme Inc.",
    location: "New York, USA",
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    conversations: 5,
    status: "active",
    plan: "Enterprise",
  },
  {
    id: "2",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Tech Solutions",
    location: "San Francisco, USA",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    conversations: 3,
    status: "active",
    plan: "Pro",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Global Innovations",
    location: "Toronto, Canada",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    conversations: 2,
    status: "active",
    plan: "Pro",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Wilson & Co",
    location: "London, UK",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    conversations: 1,
    status: "inactive",
    plan: "Basic",
  },
  {
    id: "5",
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Creative Studios",
    location: "Berlin, Germany",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    conversations: 4,
    status: "active",
    plan: "Enterprise",
  },
  {
    id: "6",
    name: "Robert Kim",
    email: "robert.kim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Kim Enterprises",
    location: "Seoul, South Korea",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    conversations: 2,
    status: "inactive",
    plan: "Pro",
  },
  {
    id: "7",
    name: "Amanda Garcia",
    email: "amanda.g@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Garcia & Associates",
    location: "Madrid, Spain",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    conversations: 0,
    status: "inactive",
    plan: "Basic",
  },
  {
    id: "8",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Smith Technologies",
    location: "Sydney, Australia",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    conversations: 1,
    status: "active",
    plan: "Pro",
  },
]

export default function Customers() {
  const [customers, setCustomers] = useState(sampleCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const formatLastActive = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    // Apply search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    // Apply plan filter
    const matchesPlan = planFilter === "all" || customer.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-intercom-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">View and manage your customer base</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Customer grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="customer-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium truncate">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                      <p className="mt-1 text-xs truncate">{customer.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="truncate">{customer.location}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="truncate">{customer.plan}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="truncate">{formatLastActive(customer.lastActive)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Conversations</p>
                    <p className="truncate">{customer.conversations}</p>
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {customer.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
