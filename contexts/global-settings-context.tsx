"use client"

import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast" // Assuming you have this

// --- Type Definitions ---
interface Country {
  code: string
  name: string
  currencyCode: string
  currencySymbol: string
  locale: string // For Intl.NumberFormat
}

interface Currency {
  code: string
  name: string
  symbol: string
}

interface ExchangeRates {
  [currencyCode: string]: number // Rate to convert FROM BASE (INR) TO this currencyCode
}

interface GlobalSettingsContextType {
  selectedCountry: Country
  updateSelectedCountry: (countryCode: string) => void
  availableCountries: Country[]
  selectedCurrency: Currency
  updateSelectedCurrency: (currencyCode: string) => void
  availableCurrencies: Currency[]
  formatCurrency: (
    value: number,
    targetCurrencyCode?: string, // Optional: if you want to format for a specific currency not the global one
    options?: Intl.NumberFormatOptions,
  ) => string
  exchangeRates: ExchangeRates
  baseCurrency: Currency
  isExchangeRateLoading: boolean
}

// --- Mock Data ---
const MOCK_COUNTRIES: Country[] = [
  { code: "IN", name: "India", currencyCode: "INR", currencySymbol: "₹", locale: "en-IN" },
  { code: "US", name: "United States", currencyCode: "USD", currencySymbol: "$", locale: "en-US" },
  { code: "GB", name: "United Kingdom", currencyCode: "GBP", currencySymbol: "£", locale: "en-GB" },
  { code: "EU", name: "Eurozone", currencyCode: "EUR", currencySymbol: "€", locale: "de-DE" }, // Example locale
  { code: "JP", name: "Japan", currencyCode: "JPY", currencySymbol: "¥", locale: "ja-JP" },
  { code: "CA", name: "Canada", currencyCode: "CAD", currencySymbol: "CA$", locale: "en-CA" },
  { code: "AU", name: "Australia", currencyCode: "AUD", currencySymbol: "A$", locale: "en-AU" },
]

const MOCK_CURRENCIES: Currency[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
]

const BASE_CURRENCY_DETAILS: Currency = MOCK_CURRENCIES.find((c) => c.code === "INR")!

// Rates to convert 1 INR to X Target Currency
const MOCK_RATES_FROM_INR: ExchangeRates = {
  USD: 0.012, // 1 INR = 0.012 USD
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  EUR: 0.011, // 1 INR = 0.011 EUR
  JPY: 1.8, // 1 INR = 1.80 JPY
  CAD: 0.016, // 1 INR = 0.016 CAD
  AUD: 0.018, // 1 INR = 0.018 AUD
  INR: 1, // 1 INR = 1 INR
}

// --- Context Creation ---
const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined)

// --- Provider Component ---
interface GlobalSettingsProviderProps {
  children: ReactNode
}

export function GlobalSettingsProvider({ children }: GlobalSettingsProviderProps) {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(MOCK_COUNTRIES[0])
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(
    MOCK_CURRENCIES.find((c) => c.code === MOCK_COUNTRIES[0].currencyCode) || MOCK_CURRENCIES[0],
  )
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ INR: 1 })
  const [isExchangeRateLoading, setIsExchangeRateLoading] = useState<boolean>(false)

  const fetchAndSetRates = useCallback(
    async (targetCurrencyCode: string) => {
      if (targetCurrencyCode === BASE_CURRENCY_DETAILS.code) {
        setExchangeRates((prev) => ({ ...prev, [targetCurrencyCode]: 1 }))
        return
      }
      if (exchangeRates[targetCurrencyCode]) return // Already have rate

      setIsExchangeRateLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      try {
        const rate = MOCK_RATES_FROM_INR[targetCurrencyCode]
        if (rate !== undefined) {
          setExchangeRates((prev) => ({ ...prev, [targetCurrencyCode]: rate }))
        } else {
          throw new Error(`Rate not found for ${targetCurrencyCode}`)
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate for", targetCurrencyCode, error)
        toast({
          title: "Error",
          description: `Could not fetch exchange rate for ${targetCurrencyCode}. Displaying in INR.`,
          variant: "destructive",
        })
        // Optionally set a fallback or leave it to formatCurrency to handle
      } finally {
        setIsExchangeRateLoading(false)
      }
    },
    [exchangeRates],
  ) // Added exchangeRates to dependency array

  useEffect(() => {
    if (selectedCurrency.code !== BASE_CURRENCY_DETAILS.code && !exchangeRates[selectedCurrency.code]) {
      fetchAndSetRates(selectedCurrency.code)
    }
  }, [selectedCurrency, fetchAndSetRates, exchangeRates])

  const updateSelectedCountry = useCallback((countryCode: string) => {
    const country = MOCK_COUNTRIES.find((c) => c.code === countryCode)
    if (country) {
      setSelectedCountryState(country)
      const newCurrency = MOCK_CURRENCIES.find((curr) => curr.code === country.currencyCode)
      if (newCurrency) {
        setSelectedCurrencyState(newCurrency)
      }
    }
  }, [])

  const updateSelectedCurrency = useCallback(
    (currencyCode: string) => {
      const currency = MOCK_CURRENCIES.find((c) => c.code === currencyCode)
      if (currency) {
        setSelectedCurrencyState(currency)
        // Attempt to find a country that uses this currency for locale, or default
        const countryForLocale = MOCK_COUNTRIES.find((co) => co.currencyCode === currency.code) || selectedCountry
        setSelectedCountryState(countryForLocale) // Update country if a primary one for this currency exists
      }
    },
    [selectedCountry],
  )

  const formatCurrency = useCallback(
    (
      valueInBase: number, // Value is always assumed to be in BASE_CURRENCY (INR)
      targetCurrencyCodeParam?: string,
      options?: Intl.NumberFormatOptions,
    ): string => {
      const targetCurrencyCode = targetCurrencyCodeParam || selectedCurrency.code
      const targetCurrInfo = MOCK_CURRENCIES.find((c) => c.code === targetCurrencyCode)
      const countryForLocale = MOCK_COUNTRIES.find((c) => c.currencyCode === targetCurrencyCode) || selectedCountry

      if (!targetCurrInfo) {
        // Fallback to base currency if target currency info is not found
        return new Intl.NumberFormat(BASE_CURRENCY_DETAILS.locale || "en-IN", {
          style: "currency",
          currency: BASE_CURRENCY_DETAILS.code,
          ...options,
        }).format(valueInBase)
      }

      let finalValue = valueInBase
      if (targetCurrencyCode !== BASE_CURRENCY_DETAILS.code) {
        const rate = exchangeRates[targetCurrencyCode]
        if (rate) {
          finalValue = valueInBase * rate
        } else {
          // Rate not available, display in base currency with a note or just base
          // For now, just format in base currency if rate is missing
          console.warn(
            `Exchange rate for ${targetCurrencyCode} not available. Displaying in ${BASE_CURRENCY_DETAILS.code}.`,
          )
          return (
            new Intl.NumberFormat(countryForLocale.locale, {
              style: "currency",
              currency: BASE_CURRENCY_DETAILS.code, // Show in INR
              ...options,
            }).format(valueInBase) + ` (${BASE_CURRENCY_DETAILS.code} - rate unavailable)`
          )
        }
      }

      return new Intl.NumberFormat(countryForLocale.locale, {
        style: "currency",
        currency: targetCurrInfo.code,
        ...options,
      }).format(finalValue)
    },
    [selectedCurrency, exchangeRates, selectedCountry],
  )

  const contextValue = useMemo(
    () => ({
      selectedCountry,
      updateSelectedCountry,
      availableCountries: MOCK_COUNTRIES,
      selectedCurrency,
      updateSelectedCurrency,
      availableCurrencies: MOCK_CURRENCIES,
      formatCurrency,
      exchangeRates,
      baseCurrency: BASE_CURRENCY_DETAILS,
      isExchangeRateLoading,
    }),
    [
      selectedCountry,
      updateSelectedCountry,
      selectedCurrency,
      updateSelectedCurrency,
      formatCurrency,
      exchangeRates,
      isExchangeRateLoading,
    ],
  ) // Removed baseCurrency from deps as it's constant

  return <GlobalSettingsContext.Provider value={contextValue}>{children}</GlobalSettingsContext.Provider>
}

// --- Custom Hook ---
export function useGlobalSettings() {
  const context = useContext(GlobalSettingsContext)
  if (context === undefined) {
    throw new Error("useGlobalSettings must be used within a GlobalSettingsProvider")
  }
  return context
}
