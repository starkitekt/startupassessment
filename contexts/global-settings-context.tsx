"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"

interface Country {
  code: string
  name: string
  flag: string
  defaultCurrencyCode: string
}

interface Currency {
  code: string
  name: string
  symbol: string
}

interface GlobalSettingsContextType {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  availableCountries: Country[]
  selectedCurrency: Currency
  setSelectedCurrency: (currency: Currency) => void
  availableCurrencies: Currency[]
  availableCurrenciesForCountry: Currency[]
  formatCurrency: (value: number) => string
}

const supportedCountries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", defaultCurrencyCode: "INR" },
  { code: "US", name: "United States", flag: "🇺🇸", defaultCurrencyCode: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", defaultCurrencyCode: "GBP" },
  { code: "DE", name: "Germany", flag: "🇩🇪", defaultCurrencyCode: "EUR" },
  { code: "JP", name: "Japan", flag: "🇯🇵", defaultCurrencyCode: "JPY" },
]

const allCurrencies: Currency[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

const countryCurrencyMap: Record<string, string[]> = {
  IN: ["INR"],
  US: ["USD"],
  GB: ["GBP"],
  DE: ["EUR"],
  JP: ["JPY"],
  // Could add more, e.g. EUR for multiple EU countries
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined)

export const GlobalSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(supportedCountries[0]) // Default to India
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(
    allCurrencies.find((c) => c.code === supportedCountries[0].defaultCurrencyCode) || allCurrencies[0],
  )

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country)
    const defaultCurrencyForCountry =
      allCurrencies.find((c) => c.code === country.defaultCurrencyCode) || allCurrencies[0]
    setSelectedCurrencyState(defaultCurrencyForCountry)
  }

  const availableCurrenciesForCountry = useMemo(() => {
    const currencyCodes = countryCurrencyMap[selectedCountry.code] || [selectedCountry.defaultCurrencyCode]
    return allCurrencies.filter((currency) => currencyCodes.includes(currency.code))
  }, [selectedCountry])

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat(
        selectedCountry.code === "IN"
          ? "en-IN"
          : selectedCountry.code.toLowerCase() + "-" + selectedCountry.code.toUpperCase(),
        {
          // e.g., en-IN, en-US
          style: "currency",
          currency: selectedCurrency.code,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      ).format(value)
    } catch (e) {
      // Fallback for unsupported locales or currencies
      return `${selectedCurrency.symbol}${value.toFixed(2)}`
    }
  }

  return (
    <GlobalSettingsContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        availableCountries: supportedCountries,
        selectedCurrency,
        setSelectedCurrency: setSelectedCurrencyState,
        availableCurrencies: allCurrencies,
        availableCurrenciesForCountry,
        formatCurrency,
      }}
    >
      {children}
    </GlobalSettingsContext.Provider>
  )
}

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext)
  if (context === undefined) {
    throw new Error("useGlobalSettings must be used within a GlobalSettingsProvider")
  }
  return context
}
