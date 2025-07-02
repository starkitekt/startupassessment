"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, ArrowRight, Shield } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "manager" | "analyst" | "startup_founder" | "mentor"
  organization?: string
  isVerified: boolean
  onboardingComplete: boolean
}

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

export function AuthSystem() {
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot" | "verify" | "onboarding">("login")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "", rememberMe: false })
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    organization: "",
    agreeToTerms: false,
  })
  const [forgotForm, setForgotForm] = useState({ email: "" })
  const [verifyForm, setVerifyForm] = useState({ code: "" })

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "profile",
      title: "Complete Your Profile",
      description: "Add your professional information and preferences",
      completed: false,
      required: true,
    },
    {
      id: "organization",
      title: "Organization Setup",
      description: "Configure your organization settings and team",
      completed: false,
      required: true,
    },
    {
      id: "preferences",
      title: "Set Preferences",
      description: "Customize your dashboard and notification settings",
      completed: false,
      required: false,
    },
    {
      id: "security",
      title: "Security Setup",
      description: "Enable two-factor authentication and security features",
      completed: false,
      required: false,
    },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser: AuthUser = {
        id: "user123",
        email: loginForm.email,
        firstName: "John",
        lastName: "Doe",
        role: "manager",
        organization: "TechCorp Incubator",
        isVerified: true,
        onboardingComplete: false,
      }

      setUser(mockUser)

      if (!mockUser.onboardingComplete) {
        setAuthMode("onboarding")
      } else {
        router.push("/")
      }

      toast({
        title: "Login successful",
        description: "Welcome back to the incubator platform!",
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (!registerForm.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setAuthMode("verify")

      toast({
        title: "Registration successful",
        description: "Please check your email for verification instructions.",
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reset email sent",
        description: "Please check your email for password reset instructions.",
      })

      setAuthMode("login")
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: AuthUser = {
        id: "user123",
        email: registerForm.email,
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        role: registerForm.role as any,
        organization: registerForm.organization,
        isVerified: true,
        onboardingComplete: false,
      }

      setUser(mockUser)
      setAuthMode("onboarding")

      toast({
        title: "Email verified",
        description: "Your account has been verified successfully!",
      })
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      // Complete onboarding
      if (user) {
        setUser({ ...user, onboardingComplete: true })
        router.push("/")
        toast({
          title: "Welcome aboard!",
          description: "Your account setup is complete. Let's get started!",
        })
      }
    }
  }

  const handleSkipOnboarding = () => {
    if (user) {
      setUser({ ...user, onboardingComplete: true })
      router.push("/")
    }
  }

  const onboardingProgress = ((onboardingStep + 1) / onboardingSteps.length) * 100

  if (authMode === "onboarding" && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to the Incubator Platform!</CardTitle>
            <CardDescription>Let's set up your account to get you started</CardDescription>
            <div className="mt-4">
              <Progress value={onboardingProgress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {onboardingStep + 1} of {onboardingSteps.length}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-4">
              {onboardingSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    index <= onboardingStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < onboardingStep
                        ? "bg-primary text-primary-foreground"
                        : index === onboardingStep
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-muted"
                    }`}
                  >
                    {index < onboardingStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{onboardingSteps[onboardingStep].title}</h3>
              <p className="text-muted-foreground mb-4">{onboardingSteps[onboardingStep].description}</p>

              {onboardingStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Profile Picture</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <textarea
                        className="mt-2 w-full h-20 px-3 py-2 border rounded-md"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number</Label>
                      <Input placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <Label>LinkedIn Profile</Label>
                      <Input placeholder="https://linkedin.com/in/..." />
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Organization Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="incubator">Incubator</SelectItem>
                          <SelectItem value="accelerator">Accelerator</SelectItem>
                          <SelectItem value="vc">Venture Capital</SelectItem>
                          <SelectItem value="corporate">Corporate Innovation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Team Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 people</SelectItem>
                          <SelectItem value="6-20">6-20 people</SelectItem>
                          <SelectItem value="21-50">21-50 people</SelectItem>
                          <SelectItem value="50+">50+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Focus Areas</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {["FinTech", "HealthTech", "EdTech", "CleanTech", "AI/ML", "SaaS"].map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox id={area} />
                          <Label htmlFor={area} className="text-sm">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Dashboard Layout</Label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                        <div className="text-sm font-medium">Compact View</div>
                        <div className="text-xs text-muted-foreground">More information in less space</div>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                        <div className="text-sm font-medium">Detailed View</div>
                        <div className="text-xs text-muted-foreground">Spacious layout with more details</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Notification Preferences</Label>
                    <div className="mt-2 space-y-2">
                      {["Email notifications", "Push notifications", "Weekly digest", "Monthly reports"].map((pref) => (
                        <div key={pref} className="flex items-center space-x-2">
                          <Checkbox id={pref} defaultChecked />
                          <Label htmlFor={pref} className="text-sm">
                            {pref}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Shield className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Security Questions</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a security question" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pet">What was your first pet's name?</SelectItem>
                        <SelectItem value="school">What was your first school's name?</SelectItem>
                        <SelectItem value="city">What city were you born in?</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Your answer" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleSkipOnboarding}>
                Skip for now
              </Button>
              <Button onClick={handleOnboardingNext}>
                {onboardingStep === onboardingSteps.length - 1 ? "Complete Setup" : "Next Step"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Incubator Platform</CardTitle>
          <CardDescription>
            {authMode === "login" && "Sign in to your account"}
            {authMode === "register" && "Create your account"}
            {authMode === "forgot" && "Reset your password"}
            {authMode === "verify" && "Verify your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginForm.rememberMe}
                      onCheckedChange={(checked) => setLoginForm({ ...loginForm, rememberMe: Boolean(checked) })}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button type="button" variant="link" className="p-0 h-auto" onClick={() => setAuthMode("forgot")}>
                    Forgot password?
                  </Button>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={registerForm.role}
                    onValueChange={(value) => setRegisterForm({ ...registerForm, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup_founder">Startup Founder</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Your organization name"
                    value={registerForm.organization}
                    onChange={(e) => setRegisterForm({ ...registerForm, organization: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={registerForm.agreeToTerms}
                    onCheckedChange={(checked) => setRegisterForm({ ...registerForm, agreeToTerms: Boolean(checked) })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            {authMode === "forgot" && (
              <div className="mt-4">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="resetEmail">Email</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotForm.email}
                      onChange={(e) => setForgotForm({ ...forgotForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <Button type="button" variant="link" className="w-full" onClick={() => setAuthMode("login")}>
                    Back to Sign In
                  </Button>
                </form>
              </div>
            )}

            {authMode === "verify" && (
              <div className="mt-4">
                <form onSubmit={handleVerifyEmail} className="space-y-4">
                  <div className="text-center">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      We've sent a verification code to {registerForm.email}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="verifyCode">Verification Code</Label>
                    <Input
                      id="verifyCode"
                      placeholder="Enter 6-digit code"
                      value={verifyForm.code}
                      onChange={(e) => setVerifyForm({ ...verifyForm, code: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Email"}
                  </Button>
                  <Button type="button" variant="link" className="w-full">
                    Resend verification code
                  </Button>
                </form>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
