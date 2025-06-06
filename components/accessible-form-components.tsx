"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"

interface FormFieldProps {
  id: string
  label: string
  description?: string
  required?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}

export function FormField({ id, label, description, required = false, error, className, children }: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={id}
        className={cn("text-sm font-medium", required && "after:content-['*'] after:ml-0.5 after:text-red-500")}
      >
        {label}
        {required && <span className="sr-only">(required)</span>}
      </Label>

      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}

      <div className="relative">{children}</div>

      {error && (
        <div id={errorId} role="alert" className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string
  showPasswordToggle?: boolean
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ id, label, description, error, required, showPasswordToggle, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type
    const errorId = error ? `${id}-error` : undefined
    const descriptionId = description ? `${id}-description` : undefined

    return (
      <FormField
        id={id!}
        label={label}
        description={description}
        required={required}
        error={error}
        className={className}
      >
        <div className="relative">
          <Input
            ref={ref}
            id={id}
            type={inputType}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(descriptionId, errorId).trim() || undefined}
            className={cn(
              "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              isFocused && "ring-2 ring-primary ring-offset-2",
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {showPasswordToggle && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
      </FormField>
    )
  },
)

AccessibleInput.displayName = "AccessibleInput"

interface AccessibleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  description?: string
  error?: string
  showCharCount?: boolean
  maxLength?: number
}

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  ({ id, label, description, error, required, showCharCount, maxLength, className, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const charCount = typeof value === "string" ? value.length : 0

    const errorId = error ? `${id}-error` : undefined
    const descriptionId = description ? `${id}-description` : undefined
    const charCountId = showCharCount ? `${id}-char-count` : undefined

    return (
      <FormField
        id={id!}
        label={label}
        description={description}
        required={required}
        error={error}
        className={className}
      >
        <div className="space-y-2">
          <Textarea
            ref={ref}
            id={id}
            required={required}
            maxLength={maxLength}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(descriptionId, errorId, charCountId).trim() || undefined}
            className={cn(
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              isFocused && "ring-2 ring-primary ring-offset-2",
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            {...props}
          />

          {showCharCount && (
            <div id={charCountId} className="flex justify-end text-xs text-muted-foreground" aria-live="polite">
              <span>
                {charCount}
                {maxLength && `/${maxLength}`} characters
              </span>
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

AccessibleTextarea.displayName = "AccessibleTextarea"

interface AccessibleSelectProps {
  id: string
  label: string
  description?: string
  error?: string
  required?: boolean
  placeholder?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function AccessibleSelect({
  id,
  label,
  description,
  error,
  required = false,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  className,
}: AccessibleSelectProps) {
  const errorId = error ? `${id}-error` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <FormField id={id} label={label} description={description} required={required} error={error} className={className}>
      <Select value={value} onValueChange={onValueChange} required={required}>
        <SelectTrigger
          id={id}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(descriptionId, errorId).trim() || undefined}
          className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-500")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  )
}

interface AccessibleCheckboxProps {
  id: string
  label: string
  description?: string
  error?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  required?: boolean
  className?: string
}

export function AccessibleCheckbox({
  id,
  label,
  description,
  error,
  checked,
  onCheckedChange,
  required = false,
  className,
}: AccessibleCheckboxProps) {
  const errorId = error ? `${id}-error` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-start space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(descriptionId, errorId).trim() || undefined}
          className={cn("mt-1", error && "border-red-500 data-[state=checked]:bg-red-500")}
        />
        <div className="space-y-1 flex-1">
          <Label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            )}
          >
            {label}
            {required && <span className="sr-only">(required)</span>}
          </Label>

          {description && (
            <p id={descriptionId} className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div id={errorId} role="alert" className="flex items-center gap-2 text-sm text-red-600 ml-6">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

interface AccessibleRadioGroupProps {
  id: string
  label: string
  description?: string
  error?: string
  required?: boolean
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function AccessibleRadioGroup({
  id,
  label,
  description,
  error,
  required = false,
  options,
  value,
  onValueChange,
  className,
}: AccessibleRadioGroupProps) {
  const errorId = error ? `${id}-error` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <FormField id={id} label={label} description={description} required={required} error={error} className={className}>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={cn(descriptionId, errorId).trim() || undefined}
        className="space-y-3"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              disabled={option.disabled}
              className={cn("mt-1", error && "border-red-500")}
            />
            <div className="space-y-1 flex-1">
              <Label
                htmlFor={`${id}-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </Label>

              {option.description && <p className="text-xs text-muted-foreground">{option.description}</p>}
            </div>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  )
}

interface FormProgressProps {
  currentStep: number
  totalSteps: number
  steps: Array<{ id: string; title: string; description?: string }>
  className?: string
}

export function FormProgress({ currentStep, totalSteps, steps, className }: FormProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("space-y-4", className)} role="group" aria-labelledby="form-progress-title">
      <div>
        <h3 id="form-progress-title" className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{steps[currentStep - 1]?.title}</p>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" aria-label={`Form progress: ${Math.round(progress)}% complete`} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span aria-live="polite">{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center text-center",
                stepNumber <= currentStep ? "text-primary" : "text-muted-foreground",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 mb-2",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isCurrent && "border-primary bg-background text-primary",
                  !isCompleted && !isCurrent && "border-muted-foreground text-muted-foreground",
                )}
                aria-label={`Step ${stepNumber}: ${step.title}${isCompleted ? " (completed)" : isCurrent ? " (current)" : ""}`}
              >
                {isCompleted ? <CheckCircle className="h-4 w-4" aria-hidden="true" /> : stepNumber}
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface FormValidationSummaryProps {
  errors: Record<string, string>
  className?: string
}

export function FormValidationSummary({ errors, className }: FormValidationSummaryProps) {
  const errorEntries = Object.entries(errors)

  if (errorEntries.length === 0) return null

  return (
    <Alert variant="destructive" className={cn("", className)} role="alert">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">Please correct the following {errorEntries.length === 1 ? "error" : "errors"}:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {errorEntries.map(([field, error]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(field)
                    if (element) {
                      element.focus()
                      element.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                  }}
                >
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  )
}
