"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { slugify } from "@/lib/utils"

type JobSuggestion = {
  id: number
  title: string
  rawTitle?: string
  practice_name: string
  suburb: string
  state: string
  slug?: string
}

interface SearchFormProps {
  initialFilter?: string
  onSearch?: (term: string) => void
}

export function SearchForm({ initialFilter, onSearch }: SearchFormProps = {}) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Set placeholder text based on filter
  const getPlaceholderText = () => {
    if (initialFilter === "dpa") {
      return "Search DPA jobs by title, location, or keywords"
    } else if (initialFilter && initialFilter.startsWith("mmm")) {
      return `Search ${initialFilter.toUpperCase()} jobs by title, location, or keywords`
    }
    return "Search jobs by title, location, or keywords"
  }

  // Handle the debounced search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Fetch suggestions based on the debounced term
  useEffect(() => {
    const fetchJobSuggestions = async () => {
      if (debouncedTerm.length < 2) {
        setSuggestions([])
        setHasSearched(false)
        setError(null)
        setOpen(false)
        return
      }

      setIsLoading(true)
      setHasSearched(false)
      setError(null)
      setOpen(true)

      try {
        console.log("Fetching job suggestions for:", debouncedTerm)

        // Include filter in the API request if it exists
        const filterParam = initialFilter ? `&filter=${initialFilter}` : ""

        // Use relative URL for client-side fetching
        const response = await fetch(
          `/api/jobs/search/suggestions?q=${encodeURIComponent(debouncedTerm.trim())}${filterParam}`,
          { cache: "no-store" }, // Ensure we don't get cached results
        )

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Suggestions response:", data)

        if (data.error) {
          throw new Error(data.error)
        }

        setSuggestions(data.jobs || [])
        setHasSearched(true)
        setOpen(data.jobs && data.jobs.length > 0)
      } catch (error) {
        console.error("Error fetching job suggestions:", error)
        setError(error.message || "Failed to fetch suggestions")
        setSuggestions([])
        setHasSearched(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobSuggestions()
  }, [debouncedTerm, initialFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)

    if (onSearch && searchTerm) {
      onSearch(searchTerm.trim())
      return
    }

    // Include filter in the search URL if it exists
    const filterParam = initialFilter ? `&filter=${initialFilter}` : ""

    if (searchTerm) {
      router.push(`/all-jobs?q=${encodeURIComponent(searchTerm.trim())}${filterParam}`)
    } else {
      router.push(`/all-jobs${initialFilter ? `?filter=${initialFilter}` : ""}`)
    }
  }

  const handleSelect = (job: JobSuggestion) => {
    setOpen(false)
    if (job.slug) {
      router.push(`/jobs/${job.slug}`)
    } else {
      const slug = `${slugify(job.title)}-${job.id}`
      router.push(`/jobs/${slug}`)
    }
  }

  // Handle input focus
  const handleInputFocus = () => {
    if (searchTerm.length >= 2 && suggestions.length > 0) {
      setOpen(true)
    }
  }

  // Handle clicking outside to close dropdown
  const handleClickOutside = () => {
    setOpen(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative z-20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialFilter === "dpa"
          ? "Find DPA GP Jobs in Australia"
          : initialFilter && initialFilter.startsWith("mmm")
            ? `Find ${initialFilter.toUpperCase()} GP Jobs in Australia`
            : "Find GP Jobs in Australia"}
      </h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="relative w-full">
              <Input
                ref={inputRef}
                type="text"
                placeholder={getPlaceholderText()}
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleInputFocus}
                autoComplete="off"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Manually controlled dropdown instead of using Popover */}
            {open && (
              <div className="absolute z-50 w-full bg-white rounded-md border border-gray-200 shadow-md mt-1">
                <Command>
                  <CommandList>
                    {isLoading && (
                      <div className="py-6 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-emerald-600" />
                        <p className="text-sm text-gray-500 mt-2">Searching for jobs...</p>
                      </div>
                    )}

                    {error && !isLoading && (
                      <div className="py-6 text-center">
                        <p className="text-sm text-red-500">Error: {error}</p>
                        <p className="text-xs text-gray-500 mt-2">Please try again or refine your search</p>
                      </div>
                    )}

                    {!isLoading && !error && hasSearched && suggestions.length === 0 && (
                      <CommandEmpty>No jobs found matching your search</CommandEmpty>
                    )}

                    {!isLoading && !error && suggestions.length > 0 && (
                      <CommandGroup heading="Job Suggestions">
                        {suggestions.map((job) => (
                          <CommandItem key={job.id} onSelect={() => handleSelect(job)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{job.title}</span>
                              <span className="text-sm text-gray-500">
                                {job.practice_name} - {job.suburb}, {job.state}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            Search Jobs
          </Button>
        </div>

        {initialFilter && (
          <div className="flex items-center justify-end mt-2">
            <div className="text-sm text-gray-500">
              {initialFilter === "dpa" ? "DPA Only" : initialFilter.toUpperCase()}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
