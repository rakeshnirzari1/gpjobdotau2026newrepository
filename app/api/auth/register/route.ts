import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword, createToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json()

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const newUser = await sql`
      INSERT INTO users (name, email, password_hash, user_type)
      VALUES (${name}, ${email}, ${passwordHash}, ${userType})
      RETURNING id, name, email, user_type
    `

    // Create token
    const token = await createToken({
      id: newUser[0].id,
      email: newUser[0].email,
      userType: newUser[0].user_type,
    })

    // Set cookie
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        userType: newUser[0].user_type,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
