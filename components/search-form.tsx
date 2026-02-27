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

  const getPlaceholderText = () => {
    if (initialFilter === "dpa") {
      return "Search DPA jobs by title, location, or keywords..."
    } else if (initialFilter && initialFilter.startsWith("mmm")) {
      return `Search ${initialFilter.toUpperCase()} jobs by title, location, or keywords...`
    }
    return "Search by job title, location, or keywords..."
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

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
        const filterParam = initialFilter ? `&filter=${initialFilter}` : ""

        const response = await fetch(
          `/api/jobs/search/suggestions?q=${encodeURIComponent(debouncedTerm.trim())}${filterParam}`,
          { cache: "no-store" },
        )

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setSuggestions(data.jobs || [])
        setHasSearched(true)
        setOpen(data.jobs && data.jobs.length > 0)
      } catch (error: any) {
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

  const handleInputFocus = () => {
    if (searchTerm.length >= 2 && suggestions.length > 0) {
      setOpen(true)
    }
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-6 md:p-8 relative z-20 max-w-4xl mx-auto -mt-8">
      <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-center text-card-foreground">
        {initialFilter === "dpa"
          ? "Find DPA GP Jobs"
          : initialFilter && initialFilter.startsWith("mmm")
            ? `Find ${initialFilter.toUpperCase()} GP Jobs`
            : "Find Your Next GP Position"}
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-5">
        Browse opportunities across Australia
      </p>
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="relative w-full">
              <Input
                ref={inputRef}
                type="text"
                placeholder={getPlaceholderText()}
                className="w-full pl-10 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleInputFocus}
                autoComplete="off"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>

            {open && (
              <div className="absolute z-50 w-full bg-card rounded-lg border border-border shadow-lg mt-1">
                <Command>
                  <CommandList>
                    {isLoading && (
                      <div className="py-6 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        <p className="text-sm text-muted-foreground mt-2">Searching for jobs...</p>
                      </div>
                    )}

                    {error && !isLoading && (
                      <div className="py-6 text-center">
                        <p className="text-sm text-destructive">Error: {error}</p>
                        <p className="text-xs text-muted-foreground mt-2">Please try again or refine your search</p>
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
                              <span className="font-medium text-card-foreground">{job.title}</span>
                              <span className="text-sm text-muted-foreground">
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
          <Button type="submit" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Search Jobs
          </Button>
        </div>

        {initialFilter && (
          <div className="flex items-center justify-end mt-1">
            <div className="text-xs text-muted-foreground px-2.5 py-1 bg-secondary rounded-full">
              {initialFilter === "dpa" ? "DPA Only" : initialFilter.toUpperCase()}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
