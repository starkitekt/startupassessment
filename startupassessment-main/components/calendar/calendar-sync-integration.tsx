"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Calendar,
  FolderSyncIcon as Sync,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Smartphone,
  Globe,
  Plus,
} from "lucide-react"

interface CalendarProvider {
  id: string
  name: string
  type: "google" | "outlook" | "apple" | "exchange"
  icon: React.ReactNode
  connected: boolean
  lastSync?: Date
  syncDirection: "import" | "export" | "bidirectional"
  status: "active" | "error" | "syncing"
}

interface SyncSettings {
  autoSync: boolean
  syncInterval: number // minutes
  conflictResolution: "local" | "remote" | "manual"
  eventTypes: string[]
  reminderSync: boolean
  attendeeSync: boolean
}

const CALENDAR_PROVIDERS: CalendarProvider[] = [
  {
    id: "google",
    name: "Google Calendar",
    type: "google",
    icon: <Globe className="h-5 w-5" />,
    connected: true,
    lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    syncDirection: "bidirectional",
    status: "active",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    type: "outlook",
    icon: <Mail className="h-5 w-5" />,
    connected: true,
    lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    syncDirection: "import",
    status: "active",
  },
  {
    id: "apple",
    name: "Apple iCloud",
    type: "apple",
    icon: <Smartphone className="h-5 w-5" />,
    connected: false,
    syncDirection: "bidirectional",
    status: "active",
  },
]

export function CalendarSyncIntegration() {
  const [providers, setProviders] = useState<CalendarProvider[]>(CALENDAR_PROVIDERS)
  const [syncSettings, setSyncSettings] = useState<SyncSettings>({
    autoSync: true,
    syncInterval: 15,
    conflictResolution: "manual",
    eventTypes: ["meeting", "deadline", "milestone"],
    reminderSync: true,
    attendeeSync: true,
  })
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const { toast } = useToast()

  const handleConnect = async (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, connected: true, status: "active" as const } : p)),
    )

    toast({
      title: "Calendar Connected",
      description: `Successfully connected to ${providers.find((p) => p.id === providerId)?.name}`,
    })
  }

  const handleDisconnect = (providerId: string) => {
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, connected: false } : p)))

    toast({
      title: "Calendar Disconnected",
      description: `Disconnected from ${providers.find((p) => p.id === providerId)?.name}`,
    })
  }

  const handleSync = async (providerId?: string) => {
    setIsSyncing(true)

    if (providerId) {
      setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "syncing" as const } : p)))
    }

    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (providerId) {
      setProviders((prev) =>
        prev.map((p) => (p.id === providerId ? { ...p, status: "active" as const, lastSync: new Date() } : p)),
      )
    } else {
      setProviders((prev) =>
        prev.map((p) => (p.connected ? { ...p, status: "active" as const, lastSync: new Date() } : p)),
      )
    }

    setIsSyncing(false)

    toast({
      title: "Sync Complete",
      description: providerId
        ? `Synced with ${providers.find((p) => p.id === providerId)?.name}`
        : "Synced with all connected calendars",
    })
  }

  const getStatusIcon = (status: CalendarProvider["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "syncing":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const formatLastSync = (date?: Date) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Calendar Integration</h2>
          <p className="text-muted-foreground">Sync with external calendar services</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleSync()} disabled={isSyncing}>
            <Sync className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            Sync All
          </Button>
          <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Calendar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Calendar Provider</DialogTitle>
                <DialogDescription>Connect a new calendar service to sync your events</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {["Google Calendar", "Microsoft Outlook", "Apple iCloud", "Exchange Server"].map((provider) => (
                    <Button
                      key={provider}
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => {
                        toast({
                          title: "Provider Added",
                          description: `${provider} will be configured`,
                        })
                        setIsAddProviderOpen(false)
                      }}
                    >
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">{provider}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProviderOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">Connected Calendars</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
          <TabsTrigger value="conflicts">Conflict Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid gap-4">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {provider.icon}
                        <div>
                          <h3 className="font-semibold">{provider.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {getStatusIcon(provider.status)}
                            <span>Last sync: {formatLastSync(provider.lastSync)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={provider.connected ? "default" : "secondary"}>
                          {provider.connected ? "Connected" : "Disconnected"}
                        </Badge>
                        <Badge variant="outline">{provider.syncDirection}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {provider.connected && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSync(provider.id)}
                          disabled={provider.status === "syncing"}
                        >
                          <Sync className={`h-4 w-4 mr-1 ${provider.status === "syncing" ? "animate-spin" : ""}`} />
                          Sync
                        </Button>
                      )}

                      {provider.connected ? (
                        <Button variant="outline" size="sm" onClick={() => handleDisconnect(provider.id)}>
                          Disconnect
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect(provider.id)}>
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync calendars at regular intervals</p>
                </div>
                <Switch
                  checked={syncSettings.autoSync}
                  onCheckedChange={(checked) => setSyncSettings((prev) => ({ ...prev, autoSync: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Sync Interval</Label>
                <Select
                  value={syncSettings.syncInterval.toString()}
                  onValueChange={(value) =>
                    setSyncSettings((prev) => ({ ...prev, syncInterval: Number.parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Conflict Resolution</Label>
                <Select
                  value={syncSettings.conflictResolution}
                  onValueChange={(value: "local" | "remote" | "manual") =>
                    setSyncSettings((prev) => ({ ...prev, conflictResolution: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Prefer Local Changes</SelectItem>
                    <SelectItem value="remote">Prefer Remote Changes</SelectItem>
                    <SelectItem value="manual">Manual Resolution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Event Types to Sync</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["meeting", "deadline", "milestone", "assessment", "funding", "mentorship"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`sync-${type}`}
                        checked={syncSettings.eventTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSyncSettings((prev) => ({
                              ...prev,
                              eventTypes: [...prev.eventTypes, type],
                            }))
                          } else {
                            setSyncSettings((prev) => ({
                              ...prev,
                              eventTypes: prev.eventTypes.filter((t) => t !== type),
                            }))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`sync-${type}`} className="text-sm capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sync Reminders</Label>
                  <p className="text-sm text-muted-foreground">Include event reminders in synchronization</p>
                </div>
                <Switch
                  checked={syncSettings.reminderSync}
                  onCheckedChange={(checked) => setSyncSettings((prev) => ({ ...prev, reminderSync: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sync Attendees</Label>
                  <p className="text-sm text-muted-foreground">Include attendee information in synchronization</p>
                </div>
                <Switch
                  checked={syncSettings.attendeeSync}
                  onCheckedChange={(checked) => setSyncSettings((prev) => ({ ...prev, attendeeSync: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conflict Resolution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage conflicts that occur during calendar synchronization
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Conflicts</h3>
                  <p className="text-muted-foreground">All calendar events are synchronized successfully</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
