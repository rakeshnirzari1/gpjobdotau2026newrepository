import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sql } from "./db"
import { hash, compare } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

// Secret key for JWT
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_in_production")

// Admin email constant
const ADMIN_EMAIL = "support@gpvacancy.com.au"

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10)
}

// Compare password with hash
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return compare(password, hash)
}

// Create JWT token
export async function createToken(payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secretKey)
}

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    return null
  }
}

// Get current user from cookies
export async function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  try {
    const user = await sql`
      SELECT id, email, name, user_type 
      FROM users 
      WHERE id = ${payload.id}
    `

    if (user.length > 0) {
      // Add a virtual property to identify admin users by email
      const userData = user[0]
      if (userData.email === ADMIN_EMAIL) {
        userData.userType = "admin"
      } else {
        userData.userType = userData.user_type
      }
      return userData
    }
    return null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Alias for getCurrentUser
export const getUser = getCurrentUser

// Check if user is authenticated
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

// Check if user is a practice
export async function requirePractice() {
  const user = await requireAuth()
  if (user.userType !== "practice" && user.email !== ADMIN_EMAIL) {
    redirect("/")
  }
  return user
}

// Check if user is an admin
export async function requireAdmin() {
  const user = await requireAuth()
  if (user.email !== ADMIN_EMAIL) {
    redirect("/")
  }
  return user
}
