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
}

interface SearchFormProps {
  initialFilter?: string
}

export function SearchForm({ initialFilter }: SearchFormProps = {}) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
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
    // Set a longer timeout for normal typing (2 seconds)
    const normalTimeout = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 2000)

    // If the user has typed a space (completed a word), trigger search faster
    if (searchTerm.endsWith(" ") && searchTerm.trim().length >= 2) {
      clearTimeout(normalTimeout)
      setDebouncedTerm(searchTerm)
    }

    return () => clearTimeout(normalTimeout)
  }, [searchTerm])

  // Fetch suggestions based on the debounced term
  useEffect(() => {
    const fetchJobSuggestions = async () => {
      if (debouncedTerm.length < 2) {
        setSuggestions([])
        setHasSearched(false)
        return
      }

      setIsLoading(true)
      setHasSearched(false)

      try {
        // Include filter in the API request if it exists
        const filterParam = initialFilter ? `&filter=${initialFilter}` : ""
        const response = await fetch(
          `/api/jobs/search/suggestions?q=${encodeURIComponent(debouncedTerm.trim())}${filterParam}`,
        )
        const data = await response.json()
        setSuggestions(data.jobs || [])
        setHasSearched(true)
      } catch (error) {
        console.error("Error fetching job suggestions:", error)
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

    // Include filter in the search URL if it exists
    const filterParam = initialFilter ? `&filter=${initialFilter}` : ""

    if (searchTerm) {
      router.push(`/jobs/search?q=${encodeURIComponent(searchTerm.trim())}${filterParam}`)
    } else {
      router.push(`/jobs/search${initialFilter ? `?filter=${initialFilter}` : ""}`)
    }
    setOpen(false)
  }

  const handleSelect = (job: JobSuggestion) => {
    setOpen(false)
    const titleForSlug = job.rawTitle || job.title.replace(/ $DPA$$/, "").replace(/ $MMM\d$$/, "")
    router.push(`/jobs/${slugify(titleForSlug)}-${job.id}`)
  }

  // Only show the popover when the user has typed something and we have results or are loading
  useEffect(() => {
    if (debouncedTerm.length >= 2 && (isLoading || suggestions.length > 0 || hasSearched)) {
      setOpen(true)
    } else if (searchTerm.length < 2) {
      setOpen(false)
    }
  }, [debouncedTerm, isLoading, suggestions.length, hasSearched, searchTerm.length])

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

                    {!isLoading && hasSearched && suggestions.length === 0 && (
                      <CommandEmpty>No jobs found matching your search</CommandEmpty>
                    )}

                    {!isLoading && suggestions.length > 0 && (
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
