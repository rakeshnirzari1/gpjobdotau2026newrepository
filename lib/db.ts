import { neon } from "@neondatabase/serverless"

// Create a SQL client with the database URL
// This should only be used in server components or API routes
export const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || "")

// Helper function to check if code is running on the server
export const isServer = typeof window === "undefined"

// Safe SQL function that checks if we're on the server before executing
export function safeSql(...args: Parameters<typeof sql>) {
  if (!isServer) {
    console.error("Database connection attempted on the client side. This is not allowed.")
    throw new Error("Database connections can only be made on the server side")
  }
  return sql(...args)
}

// Helper function to format job data
export function formatJobData(job: any) {
  return {
    id: job.id,
    title: job.title,
    practice_id: job.practice_id,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
    job_type: job.job_type,
    salary_range: job.salary_range,
    is_dpa: job.is_dpa,
    mmm_classification: job.mmm_classification,
    contact_email: job.contact_email,
    contact_phone: job.contact_phone,
    application_url: job.application_url,
    suburb: job.suburb,
    state: job.state,
    postcode: job.postcode,
    is_active: job.is_active,
    is_paid: job.is_paid,
    payment_id: job.payment_id,
    paid_at: job.paid_at,
    created_at: job.created_at,
    updated_at: job.updated_at,
  }
}

// Helper function to format practice data
export function formatPracticeData(practice: any) {
  return {
    id: practice.id,
    user_id: practice.user_id,
    practice_name: practice.practice_name,
    address: practice.address,
    suburb: practice.suburb,
    state: practice.state,
    postcode: practice.postcode,
    phone: practice.phone,
    website: practice.website,
    about_practice: practice.about_practice,
    logo_url: practice.logo_url,
    created_at: practice.created_at,
    updated_at: practice.updated_at,
  }
}
