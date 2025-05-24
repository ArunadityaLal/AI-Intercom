"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

const sampleConversations = [
  {
    id: "1",
    customer: { name: "Sarah Miller", email: "sarah.miller@example.com", avatar: "/placeholder.svg" },
    subject: "Issue with checkout process",
    preview: "I'm trying to complete my purchase but the checkout button isn't working.",
    status: "open",
    priority: "high",
    lastMessage: new Date(Date.now() - 1000 * 60 * 15),
    unread: true,
    assignee: "John Doe",
  },
  {
    id: "2",
    customer: { name: "Michael Johnson", email: "michael.j@example.com", avatar: "/placeholder.svg" },
    subject: "Refund request",
    preview: "I'd like to request a refund for my recent purchase as the product doesn't meet my expectations.",
    status: "open",
    priority: "medium",
    lastMessage: new Date(Date.now() - 1000 * 60 * 45),
    unread: true,
    assignee: "John Doe",
  },
  {
    id: "3",
    customer: { name: "Emily Chen", email: "emily.chen@example.com", avatar: "/placeholder.svg" },
    subject: "Account access issues",
    preview: "I can't log into my account. I've tried resetting my password but I'm not receiving the reset email.",
    status: "open",
    priority: "high",
    lastMessage: new Date(Date.now() - 1000 * 60 * 120),
    unread: false,
    assignee: "Aisha Patel",
  },
  {
    id: "4",
    customer: { name: "David Wilson", email: "david.w@example.com", avatar: "/placeholder.svg" },
    subject: "Feature request",
    preview: "I love your product but I think it would be even better if you could add the ability to export data to CSV.",
    status: "pending",
    priority: "low",
    lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: false,
    assignee: "Michael Chen",
  },
  {
    id: "5",
    customer: { name: "Jessica Brown", email: "jessica.b@example.com", avatar: "/placeholder.svg" },
    subject: "Billing question",
    preview: "I noticed an unexpected charge on my account. Could you please explain what this is for?",
    status: "resolved",
    priority: "medium",
    lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 8),
    unread: false,
    assignee: "John Doe",
  },
  {
    id: "6",
    customer: { name: "Robert Kim", email: "robert.kim@example.com", avatar: "/placeholder.svg" },
    subject: "Integration help",
    preview: "I'm trying to integrate your API with our system but I'm running into some errors. Can you help?",
    status: "open",
    priority: "high",
    lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 12),
    unread: true,
    assignee: "Sarah Johnson",
  },
  {
    id: "7",
    customer: { name: "Amanda Garcia", email: "amanda.g@example.com", avatar: "/placeholder.svg" },
    subject: "Product feedback",
    preview: "I've been using your product for a month now and I have some feedback I'd like to share.",
    status: "pending",
    priority: "low",
    lastMessage: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: false,
    assignee: "Michael Chen",
  },
]

export default function Conversations() {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState(sampleConversations)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleConversationClick = (id) => {
    navigate(`/conversations/${id}`)
  }

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.preview.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || conversation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Open"
      case "pending":
        return "Pending"
      case "resolved":
        return "Resolved"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Conversations</h1>
          <p className="text-muted-foreground text-sm">View and manage all your customer interactions.</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 border rounded-md w-full"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="grid gap-4">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleConversationClick(conv.id)}
              className="cursor-pointer border p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <img src={conv.customer.avatar} alt="" className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{conv.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{conv.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(conv.status)}
                  <span className="text-sm">{getStatusText(conv.status)}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{conv.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
