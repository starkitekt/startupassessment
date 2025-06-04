"use client"

import React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "./top-navigation" // Assuming types are exported

interface MobileNavMenuProps {
  mainNavItems: NavItem[]
  resourcesNavItems: NavItem[]
  userDisplayName: string
  userEmail: string
  onSignOut: () => void
  currentPathname: string
  globalSettingsComponent?: React.ReactNode // For country/currency selectors
  searchComponent?: React.ReactNode
  notificationsComponent?: React.ReactNode
  userProfileComponent?: React.ReactNode
}

export function MobileNavMenu({
  mainNavItems,
  resourcesNavItems,
  userDisplayName,
  userEmail,
  onSignOut,
  currentPathname,
  globalSettingsComponent,
  searchComponent,
  notificationsComponent,
  userProfileComponent,
}: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const createNavLink = (item: NavItem, isSubItem = false) => (
    <Link
      key={item.name}
      href={item.href || "#"}
      className={cn(
        "flex items-center p-3 rounded-md text-base font-medium transition-colors",
        isSubItem ? "pl-10" : "pl-3",
        item.href && (currentPathname === item.href || (item.href !== "/" && currentPathname.startsWith(item.href)))
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
      )}
      onClick={() => item.href && setIsOpen(false)} // Close sheet on navigation
    >
      {item.icon && <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />}
      {item.name}
    </Link>
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-foreground/80 hover:text-foreground">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-jpmc-brand-blue-hsl to-jpmc-brand-darkblue-hsl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Incubator Portal</span>
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-foreground/70">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {searchComponent && <div className="mb-4">{searchComponent}</div>}

          <Accordion type="multiple" className="w-full">
            {mainNavItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <AccordionItem value={item.name} key={item.name} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center p-3 rounded-md text-base font-medium transition-colors hover:no-underline hover:bg-muted",
                      item.children.some(
                        (child) =>
                          child.href &&
                          (currentPathname === child.href ||
                            (child.href !== "/" && currentPathname.startsWith(child.href))),
                      )
                        ? "text-primary"
                        : "text-foreground/80",
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />}
                      {item.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-0">
                    <div className="ml-0 space-y-1">{item.children.map((child) => createNavLink(child, true))}</div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                createNavLink(item)
              ),
            )}

            {/* Resources Section */}
            <AccordionItem value="resources" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "flex items-center p-3 rounded-md text-base font-medium transition-colors hover:no-underline hover:bg-muted",
                  resourcesNavItems.some(
                    (child) =>
                      child.href &&
                      (currentPathname === child.href ||
                        (child.href !== "/" && currentPathname.startsWith(child.href))),
                  )
                    ? "text-primary"
                    : "text-foreground/80",
                )}
              >
                <div className="flex items-center">
                  {/* You can add a generic icon for Resources if needed */}
                  Resources
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1 pl-0">
                <div className="ml-0 space-y-1">{resourcesNavItems.map((child) => createNavLink(child, true))}</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {globalSettingsComponent && <div className="mt-4 pt-4 border-t">{globalSettingsComponent}</div>}
        </div>

        <div className="p-4 border-t">
          {userProfileComponent ? (
            React.cloneElement(userProfileComponent as React.ReactElement<any>, {
              isMobile: true,
              onSignOut: () => {
                onSignOut()
                setIsOpen(false)
              },
            })
          ) : (
            <>
              <div className="mb-2">
                <p className="text-sm font-medium text-foreground">{userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  onSignOut()
                  setIsOpen(false)
                }}
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
