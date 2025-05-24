"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Send, Paperclip, MoreHorizontal, User, Bot, Phone, Video } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { formatDate } from "../lib/utils"
import { useToast } from "../components/ui/use-toast"

// Sample conversation data
const sampleConversations = [
  {
    id: "1",
    customer: {
      name: "Sarah Miller",
      email: "sarah.miller..example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Acme Inc.",
      location: "New York, USA",
      timezone: "EST (UTC-5)",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    subject: "Issue with checkout process",
    status: "open",
    priority: "high",
    assignee: "John Doe",
    tags: ["bug", "checkout", "urgent"],
    messages: [
      {
        id: "m1",
        sender: "customer",
        content: "Hi there, I'm having an issue with the checkout process on your website. When I click the 'Complete Purchase' button, nothing happens. I've tried refreshing the page and using a different browser, but I'm still experiencing the same issue.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "m2",
        sender: "agent",
        content: "Hello Sarah, thank you for reaching out. I'm sorry to hear you're experiencing issues with our checkout process. Could you please let me know which payment method you're trying to use and if you're seeing any error messages?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
        agent: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: "m3",
        sender: "customer",
        content: "I'm trying to use my Visa credit card. There are no error messages, the button just doesn't do anything when I click it.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
      },
      {
        id: "m4",
        sender: "ai",
        content: "Based on the customer's description, this appears to be a JavaScript issue with the checkout button. Recent deployments to the payment processing system might be causing this. I recommend checking if the customer has JavaScript enabled and verifying there are no console errors.",
        timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
      },
      {
        id: "m5",
        sender: "agent",
        content: "Thank you for the additional information, Sarah. I'd like to troubleshoot this further. Could you please try clearing your browser cache and cookies, then attempt the checkout process again? Also, if possible, could you right-click on the page, select 'Inspect' or 'Developer Tools', go to the Console tab, and let me know if you see any error messages there?",
        timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
        agent: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: "m6",
        sender: "customer",
        content: "I cleared my cache and cookies, but I'm still having the same issue. I checked the console and there's an error that says 'Uncaught TypeError: Cannot read property 'submit' of null'.",
        timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
      },
    ],
    notes: [
      {
        id: "n1",
        content: "Customer has been experiencing this issue for the past day. Priority should be high as it's affecting checkout.",
        author: "John Doe",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8), // 1.8 hours ago
      },
      {
        id: "n2",
        content: "Checked with the development team - they deployed a new version of the checkout system yesterday. This might be related.",
        author: "John Doe",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      },
    ],
  },
  // More conversations would be here
]

export default function ConversationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [conversation, setConversation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [replyText, setReplyText] = useState("")
  const [noteText, setNoteText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Simulate loading conversation data
    const timer = setTimeout(() => {
      const foundConversation = sampleConversations.find(c => c.id === id)
      if (foundConversation) {
        setConversation(foundConversation)
      }
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id])

  useEffect(() => {
    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [conversation])

  const handleSendReply = () => {
    if (!replyText.trim()) return

    // Add agent message
    const newMessage = {
      id: `m${conversation.messages.length + 1}`,
      sender: "agent",
      content: replyText,
      timestamp: new Date(),
      agent: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
    setReplyText("")

    // Show toast
    toast({
      title: "Reply sent",
      description: "Your reply has been sent to the customer.",
    })

    // Simulate customer typing
    setTimeout(() => {
      setIsTyping(true)
      
      // Simulate customer reply after typing
      setTimeout(() => {
        setIsTyping(false)
        
        const customerReply = {
          id: `m${conversation.messages.length + 2}`,
          sender: "customer",
          content: "Thank you for your help! I'll try that solution and let you know if it works.",
          timestamp: new Date(),
        }
        
        setConversation(prev => ({
          ...prev,
          messages: [...prev.messages, customerReply],
        }))
      }, 3000)
    }, 1000)
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return

    // Add note
    const newNote = {
      id: `n${conversation.notes.length + 1}`,
      content: noteText,
      author: "John Doe",
      timestamp: new Date(),
    }

    setConversation(prev => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }))
    setNoteText("")

    // Show toast
    toast({
      title: "Note added",
      description: "Your note has been added to the conversation.",
    })
  }

  const handleBack = () => {
    navigate("/conversations")
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-intercom-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-lg font-medium">Conversation not found</p>
        <Button variant="link" onClick={handleBack} className="mt-2">
          Back to conversations
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{conversation.customer.name}</h1>
            <p className="text-sm text-muted-foreground">{conversation.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Video className="mr-2 h-4 w-4" />
            Video
          </Button>
          <Button variant="intercom" size="sm">
            Resolve
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-4 overflow-hidden pt-4">
        {/* Conversation */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-card">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div key={message.id} className="flex flex-col">
                  <div className="flex items-start gap-3">
                    {message.sender === "customer" ? (
                      <Avatar>
                        <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} alt={conversation.customer.name} />
                        <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : message.sender === "agent" ? (
                      <Avatar>
                        <AvatarImage src={message.agent.avatar || "/placeholder.svg"} alt={message.agent.name} />
                        <AvatarFallback>{message.agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="bg-intercom-secondary text-intercom-secondary-foreground">
                        <Bot className="h-5 w-5" />
                      </Avatar>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {message.sender === "customer"
                            ? conversation.customer.name
                            : message.sender === "agent"
                            ? message.agent.name
                            : "AI Assistant"}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                      </div>
                      <div className={`message-bubble ${message.sender}`}>{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} alt={conversation.customer.name} />
                    <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Reply box */}
          <div className="border-t p-4">
            <Textarea
              placeholder="Type your reply..."
              className="min-h-[100px] resize-none"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </div>

        {/* Customer info and notes */}
        <div className="hidden w-80 flex-shrink-0 lg:block">
          <Tabs defaultValue="customer">
            <TabsList className="w-full">
              <TabsTrigger value="customer" className="flex-1">
                <User className="mr-2 h-4 w-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Notes ({conversation.notes.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="customer" className="mt-4">
              <div className="rounded-lg border bg-card">
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} alt={conversation.customer.name} />
                      <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-2 text-lg font-medium">{conversation.customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{conversation.customer.email}</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="text-sm">{conversation.customer.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm">{conversation.customer.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Timezone</p>
                      <p className="text-sm">{conversation.customer.timezone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last seen</p>
                      <p className="text-sm">{formatDate(conversation.customer.lastSeen)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Tags</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {conversation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="rounded-lg border bg-card">
                <div className="p-4">
                  <Textarea
                    placeholder="Add a note about this conversation..."
                    className="min-h-[100px] resize-none"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <Button
                    onClick={handleAddNote}
                    disabled={!noteText.trim()}
                    className="mt-2 w-full"
                    variant="outline"
                  >
                    Add Note
                  </Button>

                  <div className="mt-4 space-y-3">
                    {conversation.notes.map((note) => (
                      <div key={note.id} className="rounded-lg border bg-background p-3">
                        <p className="text-sm">{note.content}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-medium">{note.author}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(note.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
