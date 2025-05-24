import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import AIAssistantPanel from "./AIAssistantPanel"

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    setTimeout(() => {
      toast({
        title: "Welcome to Intercom Admin",
        description: "You have 5 new conversations waiting for your response.",
      })
    }, 1000)

    return () => window.removeEventListener("resize", checkMobile)
  }, [toast])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      )}

      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className={`flex-1 overflow-auto p-4 md:p-6 ${isSidebarOpen && !isMobile ? "ml-64" : ""}`}>
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <AIAssistantPanel />
    </div>
  )
}
