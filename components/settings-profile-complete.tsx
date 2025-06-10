"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import {
  User,
  Shield,
  Bell,
  Palette,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Monitor,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  department: string
  location: string
  bio: string
  avatarUrl: string
  timezone: string
  language: string
  dateFormat: string
  createdAt: Date
  lastLogin: Date
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  loginNotifications: boolean
  sessionTimeout: number
  allowedDevices: string[]
  passwordLastChanged: Date
  securityQuestions: boolean
}

interface NotificationSettings {
  email: {
    assessments: boolean
    portfolio: boolean
    tasks: boolean
    mentions: boolean
    digest: boolean
  }
  push: {
    assessments: boolean
    portfolio: boolean
    tasks: boolean
    mentions: boolean
  }
  frequency: "immediate" | "hourly" | "daily" | "weekly"
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
}

interface PrivacySettings {
  profileVisibility: "public" | "team" | "private"
  showEmail: boolean
  showPhone: boolean
  showLocation: boolean
  dataRetention: number
  analyticsOptOut: boolean
}

export function SettingsProfileComplete() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Mock user data
  const [profile, setProfile] = useState<UserProfile>({
    id: "u1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Senior Investment Analyst",
    department: "Portfolio Management",
    location: "New York, NY",
    bio: "Experienced investment analyst with 8+ years in startup evaluation and portfolio management. Passionate about identifying high-growth potential companies.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    timezone: "America/New_York",
    language: "en-US",
    dateFormat: "MM/dd/yyyy",
    createdAt: new Date(2022, 0, 15),
    lastLogin: new Date(),
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: 480, // 8 hours in minutes
    allowedDevices: ["Chrome on MacBook Pro", "iPhone 14 Pro"],
    passwordLastChanged: new Date(2024, 8, 15),
    securityQuestions: true,
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      assessments: true,
      portfolio: true,
      tasks: true,
      mentions: true,
      digest: false,
    },
    push: {
      assessments: true,
      portfolio: false,
      tasks: true,
      mentions: true,
    },
    frequency: "immediate",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
  })

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "team",
    showEmail: false,
    showPhone: false,
    showLocation: true,
    dataRetention: 365,
    analyticsOptOut: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSecuritySettings((prev) => ({
        ...prev,
        passwordLastChanged: new Date(),
      }))

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error changing password",
        description: "There was an error changing your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Notifications updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error updating notifications",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePrivacyUpdate = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error updating privacy settings",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export will be ready for download within 24 hours. You'll receive an email notification.",
    })
  }

  const handleAccountDeletion = () => {
    toast({
      title: "Account deletion requested",
      description: "Your account deletion request has been submitted. This action cannot be undone.",
      variant: "destructive",
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings & Profile</h2>
        <p className="text-muted-foreground">Manage your account settings, preferences, and privacy controls</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and professional information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={profile.avatarUrl || "/placeholder.svg"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Change Photo</Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Remove Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile((prev) => ({ ...prev, jobTitle: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile((prev) => ({ ...prev, department: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className="h-20"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={profile.dateFormat}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, dateFormat: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleProfileUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Password last changed: {securitySettings.passwordLastChanged.toLocaleDateString()}
              </div>
              <Button onClick={handlePasswordChange} disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use an authenticator app to generate verification codes
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {securitySettings.twoFactorEnabled && <CheckCircle className="h-4 w-4 text-green-600" />}
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      setSecuritySettings((prev) => ({ ...prev, twoFactorEnabled: checked }))
                    }
                  />
                </div>
              </div>
              {securitySettings.twoFactorEnabled && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    Two-factor authentication is enabled
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>Monitor your account access and manage active sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Login Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified when someone logs into your account</div>
                </div>
                <Switch
                  checked={securitySettings.loginNotifications}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({ ...prev, loginNotifications: checked }))
                  }
                />
              </div>

              <Separator />

              <div>
                <div className="font-medium mb-2">Active Sessions</div>
                <div className="space-y-2">
                  {securitySettings.allowedDevices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{device}</div>
                          <div className="text-xs text-muted-foreground">
                            {index === 0 ? "Current session" : "Last active 2 hours ago"}
                          </div>
                        </div>
                      </div>
                      {index !== 0 && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what email notifications you'd like to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notificationSettings.email).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                    <div className="text-sm text-muted-foreground">
                      {key === "assessments" && "New assessments, reviews, and status updates"}
                      {key === "portfolio" && "Portfolio company updates and milestones"}
                      {key === "tasks" && "Task assignments and deadline reminders"}
                      {key === "mentions" && "When someone mentions you in comments"}
                      {key === "digest" && "Weekly summary of your activity"}
                    </div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        email: { ...prev.email, [key]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage push notifications for mobile and desktop.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notificationSettings.push).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                    <div className="text-sm text-muted-foreground">
                      {key === "assessments" && "Immediate notifications for urgent assessments"}
                      {key === "portfolio" && "Critical portfolio updates"}
                      {key === "tasks" && "Task assignments and urgent deadlines"}
                      {key === "mentions" && "When someone mentions you"}
                    </div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        push: { ...prev.push, [key]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control when and how often you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Frequency</Label>
                <Select
                  value={notificationSettings.frequency}
                  onValueChange={(value: any) => setNotificationSettings((prev) => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Quiet Hours</div>
                    <div className="text-sm text-muted-foreground">Pause notifications during specified hours</div>
                  </div>
                  <Switch
                    checked={notificationSettings.quietHours.enabled}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, enabled: checked },
                      }))
                    }
                  />
                </div>

                {notificationSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={notificationSettings.quietHours.start}
                        onChange={(e) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, start: e.target.value },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={notificationSettings.quietHours.end}
                        onChange={(e) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, end: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleNotificationUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose how the application looks to you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    theme === "light" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-white border rounded"></div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                      <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium">Light</div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-gray-800 border border-gray-700 rounded"></div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
                      <div className="w-1/2 h-2 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium">Dark</div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    theme === "system" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setTheme("system")}
                >
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 border rounded"></div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-gradient-to-r from-gray-300 to-gray-600 rounded"></div>
                      <div className="w-1/2 h-2 bg-gradient-to-r from-gray-200 to-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium">System</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display</CardTitle>
              <CardDescription>Customize how information is displayed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>Control who can see your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value: any) => setPrivacySettings((prev) => ({ ...prev, profileVisibility: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                    <SelectItem value="team">Team - Only team members can see your profile</SelectItem>
                    <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Show Email Address</div>
                    <div className="text-sm text-muted-foreground">Allow others to see your email address</div>
                  </div>
                  <Switch
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, showEmail: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Show Phone Number</div>
                    <div className="text-sm text-muted-foreground">Allow others to see your phone number</div>
                  </div>
                  <Switch
                    checked={privacySettings.showPhone}
                    onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, showPhone: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Show Location</div>
                    <div className="text-sm text-muted-foreground">Allow others to see your location</div>
                  </div>
                  <Switch
                    checked={privacySettings.showLocation}
                    onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, showLocation: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Analytics</CardTitle>
              <CardDescription>Manage how your data is used and stored.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Analytics Opt-out</div>
                  <div className="text-sm text-muted-foreground">Opt out of anonymous usage analytics</div>
                </div>
                <Switch
                  checked={privacySettings.analyticsOptOut}
                  onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, analyticsOptOut: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <Select
                  value={privacySettings.dataRetention.toString()}
                  onValueChange={(value) =>
                    setPrivacySettings((prev) => ({ ...prev, dataRetention: Number.parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">6 months</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="-1">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handlePrivacyUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export or delete your account data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">Download a copy of all your data</div>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium text-red-600">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                </div>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data
                        from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center gap-2 text-red-800">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Warning: This action is irreversible</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                          All your data, including profile information, assessments, and activity history will be
                          permanently deleted.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delete-confirmation">Type "DELETE" to confirm account deletion</Label>
                        <Input id="delete-confirmation" placeholder="Type DELETE here" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleAccountDeletion}>
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
