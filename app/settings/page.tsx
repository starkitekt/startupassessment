"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Palette, ShieldCheck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes" // For theme switching

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({ title: "Profile Updated", description: "Your profile information has been saved (simulated)." })
  }
  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({ title: "Password Changed", description: "Your password has been updated (simulated)." })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings, preferences, and notifications.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile picture.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Avatar" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">
                    Change Picture
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Rajesh Kumar" />
                  </div>
                  <div>
                    <Label htmlFor="emailProfile">Email Address</Label>
                    <Input id="emailProfile" type="email" defaultValue="rajesh.k@example.com" disabled />
                  </div>
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title / Role</Label>
                  <Input id="jobTitle" defaultValue="Senior Reviewer" />
                </div>
                <Button type="submit">Save Profile Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="emailNotifs" className="font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Receive updates via email.</p>
                </div>
                <Switch id="emailNotifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="appNotifs" className="font-medium">
                    In-App Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Show notifications within the portal.</p>
                </div>
                <Switch id="appNotifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <Label htmlFor="digestNotifs" className="font-medium">
                    Weekly Digest
                  </Label>
                  <p className="text-xs text-muted-foreground">Get a summary of activities once a week.</p>
                </div>
                <Switch id="digestNotifs" />
              </div>
              <Button type="button" onClick={() => toast({ title: "Preferences Saved" })}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Theme</CardTitle>
              <CardDescription>Customize the look and feel of the portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-medium">Theme</Label>
                <p className="text-xs text-muted-foreground mb-2">Select your preferred color scheme.</p>
                <div className="flex space-x-2">
                  <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                    Light
                  </Button>
                  <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                    Dark
                  </Button>
                  <Button variant={theme === "system" ? "default" : "outline"} onClick={() => setTheme("system")}>
                    System
                  </Button>
                </div>
              </div>
              {/* Add more appearance settings like font size, density etc. if needed */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Two-Factor Authentication (2FA)</h4>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Enhance your account security with 2FA.</p>
                  <Button
                    variant="outline"
                    onClick={() => toast({ title: "2FA Setup", description: "2FA setup flow would start here." })}
                  >
                    Setup 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
