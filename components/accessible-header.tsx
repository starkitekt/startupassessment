"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, Settings, LogOut, User, X } from "lucide-react"
import { NotificationCenter } from "@/components/notification-center"
import { AdvancedSearch } from "@/components/advanced-search"

interface AccessibleHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export function AccessibleHeader({ onMenuToggle, isMenuOpen }: AccessibleHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const skipLinkRef = useRef<HTMLAnchorElement>(null)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsAdvancedSearchOpen(true)
      }

      // Escape to close search
      if (e.key === "Escape" && isAdvancedSearchOpen) {
        setIsAdvancedSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isAdvancedSearchOpen])

  const handleSkipToMain = () => {
    const main = document.querySelector("main")
    if (main) {
      main.focus()
      main.scrollIntoView()
    }
  }

  return (
    <>
      {/* Skip Link for Screen Readers */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        onClick={handleSkipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
        aria-label="Main navigation"
      >
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Left section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                aria-hidden="true"
              >
                <span className="text-sm font-bold">SI</span>
              </div>
              <h1 className="hidden font-semibold sm:inline-block text-lg">
                <span className="sr-only">Startup Incubator Portal</span>
                <span aria-hidden="true">Startup Incubator</span>
              </h1>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <label htmlFor="global-search" className="sr-only">
                Search startups, mentors, assessments, and more
              </label>
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="global-search"
                ref={searchInputRef}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsAdvancedSearchOpen(true)}
                className="pl-9 pr-16 w-full"
                aria-describedby="search-shortcut"
                autoComplete="off"
              />
              <kbd
                id="search-shortcut"
                className="pointer-events-none absolute right-3 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
                aria-label="Keyboard shortcut: Command K or Control K"
              >
                <span className="text-xs" aria-hidden="true">
                  ⌘
                </span>
                <span aria-hidden="true">K</span>
              </kbd>
            </div>
          </div>

          {/* Right section */}
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="User account and notifications">
            <NotificationCenter />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open user account menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount aria-label="User account options">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={isAdvancedSearchOpen} onClose={() => setIsAdvancedSearchOpen(false)} />
    </>
  )
}
