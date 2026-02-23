import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hash } from "bcryptjs" // Using bcryptjs instead of bcrypt

export async function GET() {
  try {
    // Check if admin user already exists
    const checkResult = await sql`
      SELECT * FROM users WHERE email = 'support@gpvacancy.com.au'
    `

    if (checkResult.length > 0) {
      return NextResponse.json({ message: "Admin user already exists" }, { status: 200 })
    }

    // Create admin user if it doesn't exist
    const hashedPassword = await hash("Nirrax123!@", 10)

    await sql`
      INSERT INTO users (name, email, password_hash, user_type)
      VALUES ('Admin User', 'support@gpvacancy.com.au', ${hashedPassword}, 'admin')
    `

    return NextResponse.json({ message: "Admin user created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error setting up admin user:", error)
    return NextResponse.json({ error: "Failed to set up admin user" }, { status: 500 })
  }
}
