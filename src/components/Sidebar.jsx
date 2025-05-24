"use client";

import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Bot,
  ChevronDown,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Sidebar() {
  const location = useLocation();
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/conversations", label: "Conversations", icon: <MessageSquare className="h-5 w-5" /> },
    { path: "/customers", label: "Customers", icon: <Users className="h-5 w-5" /> },
    { path: "/ai-assistant", label: "AI Assistant", icon: <Bot className="h-5 w-5" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Support Lead", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Michael Chen", role: "Customer Success", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Aisha Patel", role: "Support Agent", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-intercom-primary flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">Intercom</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
                end={item.path === "/"}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.path === "/conversations" && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-intercom-primary text-xs text-white">
                    5
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Team section */}
        <div className="mt-6">
          <div
            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer"
            onClick={() => setIsTeamExpanded(!isTeamExpanded)}
          >
            <span>Team Members</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isTeamExpanded ? "rotate-180" : ""}`} />
          </div>

          {isTeamExpanded && (
            <ul className="mt-1 space-y-1 px-2">
              {teamMembers.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="truncate font-medium">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm">Theme</span>
              <ModeToggle />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
