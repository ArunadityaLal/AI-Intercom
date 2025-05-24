"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  Filter,
} from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

const conversationData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 52 },
  { name: "Wed", value: 49 },
  { name: "Thu", value: 63 },
  { name: "Fri", value: 58 },
  { name: "Sat", value: 41 },
  { name: "Sun", value: 39 },
]

const responseTimeData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 9 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 8 },
  { name: "Fri", value: 11 },
  { name: "Sat", value: 7 },
  { name: "Sun", value: 10 },
]

const customerSatisfactionData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 88 },
  { name: "Wed", value: 87 },
  { name: "Thu", value: 92 },
  { name: "Fri", value: 90 },
  { name: "Sat", value: 93 },
  { name: "Sun", value: 91 },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Conversations",
      value: "347",
      change: "+12%",
      trend: "up",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Active Customers",
      value: "1,284",
      change: "+5%",
      trend: "up",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Avg. Response Time",
      value: "10.2m",
      change: "-8%",
      trend: "down",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-intercom-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your customer conversations and support metrics</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Analytics Overview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-secondary p-2">{stat.icon}</div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="conversations" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="response-time">Response Time</TabsTrigger>
            <TabsTrigger value="satisfaction">Customer Satisfaction</TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Volume</CardTitle>
                <CardDescription>Number of new conversations started per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--intercom-primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response-time" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>Average time to first response in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--intercom-primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--intercom-primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Percentage of positive customer ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerSatisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--intercom-primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--intercom-primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest conversations and customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="rounded-full bg-secondary p-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">New conversation from Sarah Miller</h4>
                      <span className="text-xs text-muted-foreground">
                        {index === 0 ? "5 min ago" : index === 1 ? "25 min ago" : `${index + 1} hours ago`}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {index % 2 === 0
                        ? "I'm having trouble with the checkout process. Can you help me?"
                        : "I'd like to request a refund for my recent purchase."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
