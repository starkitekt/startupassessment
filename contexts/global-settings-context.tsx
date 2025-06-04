"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

// --- Type Definitions ---
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

interface ExchangeRates {
  [currencyCode: string]: number // Rate of 1 Base Currency (INR) to other currencies
}

interface GlobalSettingsContextType {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  availableCountries: Country[]
  selectedCurrency: Currency
  setSelectedCurrency: (currency: Currency) => void
  availableCurrencies: Currency[]
  availableCurrenciesForCountry: Currency[]
  formatCurrency: (valueInBaseINR: number, targetCurrencyCode?: string, options?: Intl.NumberFormatOptions) => string
  baseCurrency: Currency
  exchangeRates: ExchangeRates
  isExchangeRateLoading: boolean
}

// --- Constants ---
const BASE_CURRENCY_CODE = "INR"

const SUPPORTED_COUNTRIES: ReadonlyArray<Country> = [
  { code: "IN", name: "India", flag: "🇮🇳", defaultCurrencyCode: "INR" },
  { code: "US", name: "United States", flag: "🇺🇸", defaultCurrencyCode: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", defaultCurrencyCode: "GBP" },
  { code: "DE", name: "Germany", flag: "🇩🇪", defaultCurrencyCode: "EUR" },
  { code: "JP", name: "Japan", flag: "🇯🇵", defaultCurrencyCode: "JPY" },
]

const ALL_CURRENCIES: ReadonlyArray<Currency> = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

const COUNTRY_CURRENCY_MAP: Readonly<Record<string, string[]>> = {
  IN: ["INR"],
  US: ["USD"],
  GB: ["GBP"],
  DE: ["EUR"],
  JP: ["JPY"],
}

const BASE_CURRENCY_DETAILS = ALL_CURRENCIES.find((c) => c.code === BASE_CURRENCY_CODE)!

// Mock exchange rates (1 INR to X Target Currency)
const MOCK_RATES_FROM_INR: Readonly<ExchangeRates> = {
  USD: 0.0119,
  EUR: 0.011,
  GBP: 0.0094,
  JPY: 1.86,
  INR: 1,
}

// --- Helper Functions ---
// Simulate API call to fetch exchange rates
const fetchExchangeRatesAPI = async (targetCurrency: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_RATES_FROM_INR[targetCurrency]) {
        resolve(MOCK_RATES_FROM_INR[targetCurrency])
      } else {
        reject(new Error(`Rate not found for ${targetCurrency}`))
      }
    }, 500) // Simulate network delay
  })
}

// --- Context Definition ---
const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined)

// --- Provider Component ---
export const GlobalSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const [selectedCountry, setSelectedCountryState] = useState<Country>(SUPPORTED_COUNTRIES[0])
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(
    ALL_CURRENCIES.find((c) => c.code === SUPPORTED_COUNTRIES[0].defaultCurrencyCode) || ALL_CURRENCIES[0],
  )
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ INR: 1 }) // Initialize with base rate
  const [isExchangeRateLoading, setIsExchangeRateLoading] = useState(false)

  const fetchAndSetRates = useCallback(
    async (currencyToFetch: Currency) => {
      // Avoid fetching if it's the base currency or rate already exists
      if (currencyToFetch.code === BASE_CURRENCY_CODE || exchangeRates[currencyToFetch.code]) {
        return
      }
      setIsExchangeRateLoading(true)
      try {
        const rate = await fetchExchangeRatesAPI(currencyToFetch.code)
        setExchangeRates((prevRates) => ({ ...prevRates, [currencyToFetch.code]: rate }))
      } catch (error) {
        console.error("GlobalSettingsContext: Failed to fetch exchange rate:", error)
        toast({
          title: "Exchange Rate Error",
          description: `Could not fetch exchange rate for ${currencyToFetch.code}. Displaying in base currency (${BASE_CURRENCY_CODE}).`,
          variant: "destructive",
        })
      } finally {
        setIsExchangeRateLoading(false)
      }
    },
    [exchangeRates, toast], // toast is stable, exchangeRates is the key dependency
  )

  // Effect to fetch rates when selectedCurrency changes and rate is not available
  useEffect(() => {
    if (selectedCurrency.code !== BASE_CURRENCY_CODE && !exchangeRates[selectedCurrency.code]) {
      fetchAndSetRates(selectedCurrency)
    }
  }, [selectedCurrency, exchangeRates, fetchAndSetRates]) // Dependencies are correct

  const handleSetSelectedCountry = useCallback(
    (country: Country) => {
      setSelectedCountryState(country)
      const defaultCurrencyForCountry =
        ALL_CURRENCIES.find((c) => c.code === country.defaultCurrencyCode) || ALL_CURRENCIES[0]
      setSelectedCurrencyState(defaultCurrencyForCountry)
      // Fetch rates for the new default currency if needed
      if (defaultCurrencyForCountry.code !== BASE_CURRENCY_CODE && !exchangeRates[defaultCurrencyForCountry.code]) {
        fetchAndSetRates(defaultCurrencyForCountry)
      }
    },
    [exchangeRates, fetchAndSetRates], // Dependencies are correct
  )

  const handleSetSelectedCurrency = useCallback(
    (currency: Currency) => {
      setSelectedCurrencyState(currency)
      if (currency.code !== BASE_CURRENCY_CODE && !exchangeRates[currency.code]) {
        fetchAndSetRates(currency)
      }
    },
    [exchangeRates, fetchAndSetRates], // Dependencies are correct
  )

  const availableCurrenciesForCountry = useMemo(() => {
    const currencyCodes = COUNTRY_CURRENCY_MAP[selectedCountry.code] || [selectedCountry.defaultCurrencyCode]
    return ALL_CURRENCIES.filter((currency) => currencyCodes.includes(currency.code))
  }, [selectedCountry, selectedCountry.defaultCurrencyCode])

  const formatCurrency = useCallback(
    (valueInBaseINR: number, targetCurrencyCodeParam?: string, options?: Intl.NumberFormatOptions) => {
      const targetCurrencyCode = targetCurrencyCodeParam || selectedCurrency.code
      const targetCurrencyInfo = ALL_CURRENCIES.find((c) => c.code === targetCurrencyCode) || selectedCurrency

      let valueToFormat = valueInBaseINR
      let effectiveCurrencyCode = targetCurrencyCode
      let effectiveCurrencySymbol = targetCurrencyInfo.symbol

      if (targetCurrencyCode !== BASE_CURRENCY_CODE) {
        const rate = exchangeRates[targetCurrencyCode]
        if (rate) {
          valueToFormat = valueInBaseINR * rate
        } else {
          // Fallback to base currency if rate is unavailable
          console.warn(
            `GlobalSettingsContext: Rate for ${targetCurrencyCode} not found. Formatting value in ${BASE_CURRENCY_CODE}.`,
          )
          valueToFormat = valueInBaseINR
          effectiveCurrencyCode = BASE_CURRENCY_CODE
          effectiveCurrencySymbol = BASE_CURRENCY_DETAILS.symbol
        }
      }

      try {
        // Determine locale for formatting.
        let locale = "en-US" // Default generic locale
        const countryForSelectedCurrency = SUPPORTED_COUNTRIES.find(
          (c) => c.defaultCurrencyCode === effectiveCurrencyCode,
        )
        if (countryForSelectedCurrency) {
          locale =
            countryForSelectedCurrency.code === "IN"
              ? "en-IN"
              : `${countryForSelectedCurrency.code.toLowerCase()}-${countryForSelectedCurrency.code.toUpperCase()}`
        } else if (selectedCountry.defaultCurrencyCode === effectiveCurrencyCode) {
          // Fallback to selected country's locale if it matches the currency
          locale =
            selectedCountry.code === "IN"
              ? "en-IN"
              : `${selectedCountry.code.toLowerCase()}-${selectedCountry.code.toUpperCase()}`
        }

        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: effectiveCurrencyCode,
          minimumFractionDigits: options?.minimumFractionDigits ?? 2,
          maximumFractionDigits: options?.maximumFractionDigits ?? 2,
          ...options,
        }).format(valueToFormat)
      } catch (e) {
        // Ultimate fallback for unsupported locales or other Intl errors
        console.error("GlobalSettingsContext: Intl.NumberFormat error:", e)
        return `${effectiveCurrencySymbol}${valueToFormat.toFixed(2)}`
      }
    },
    [selectedCurrency.code, exchangeRates, selectedCountry], // Dependencies are correct
  )

  const contextValue = useMemo(
    () => ({
      selectedCountry,
      setSelectedCountry: handleSetSelectedCountry,
      availableCountries: SUPPORTED_COUNTRIES,
      selectedCurrency,
      setSelectedCurrency: handleSetSelectedCurrency,
      availableCurrencies: ALL_CURRENCIES,
      availableCurrenciesForCountry,
      formatCurrency,
      baseCurrency: BASE_CURRENCY_DETAILS,
      exchangeRates,
      isExchangeRateLoading,
    }),
    [
      selectedCountry,
      handleSetSelectedCountry,
      selectedCurrency,
      handleSetSelectedCurrency,
      availableCurrenciesForCountry,
      formatCurrency,
      exchangeRates,
      isExchangeRateLoading,
    ],
  )

  return <GlobalSettingsContext.Provider value={contextValue}>{children}</GlobalSettingsContext.Provider>
}

// --- Hook for Consuming Context ---
export const useGlobalSettings = (): GlobalSettingsContextType => {
  const context = useContext(GlobalSettingsContext)
  if (context === undefined) {
    throw new Error("useGlobalSettings must be used within a GlobalSettingsProvider")
  }
  return context
}
