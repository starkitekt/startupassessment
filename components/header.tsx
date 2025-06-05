"use client"

import { Bell, Search, User, Menu, Settings, LogOut, LifeBuoy, LayoutGrid, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread messages.",
    })
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/75 dark:border-slate-800">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => (window.location.href = "/")}>
            <div className="h-8 w-8 rounded bg-gradient-to-r from-jpmc-blue to-jpmc-darkblue flex items-center justify-center">
              <span className="text-white font-bold text-sm">SI</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-subtitle text-jpmc-darkblue dark:text-jpmc-lightblue">Startup India</h1>
              <p className="text-small">Incubator Portal</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups, applications, mentors..."
              className="pl-10 w-full bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-description"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-numerical text-xs"
            >
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                  <AvatarFallback className="text-numerical">RK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-description font-medium">Rajesh Kumar</p>
                <p className="text-small">rajesh.k@example.com</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="nav-text">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut className="text-numerical">⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="nav-text">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>My Dashboard</span>
                  <DropdownMenuShortcut className="text-numerical">⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="nav-text">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut className="text-numerical">⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="nav-text">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="nav-text"
                onClick={() => toast({ title: "Logged Out", description: "You have been successfully logged out." })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
                <DropdownMenuShortcut className="text-numerical">⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
