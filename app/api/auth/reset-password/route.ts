import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword } from "@/lib/auth"
import { jwtVerify } from "jose"

// Secret key for JWT
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_in_production")

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    // Validate input
    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    // Verify token
    let payload
    try {
      const { payload: tokenPayload } = await jwtVerify(token, secretKey)
      payload = tokenPayload
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    // Check if token is for password reset
    if (payload.purpose !== "password_reset") {
      return NextResponse.json({ error: "Invalid token purpose" }, { status: 400 })
    }

    // Check if token exists in database and is not expired
    const tokens = await sql`
      SELECT * FROM password_reset_tokens 
      WHERE token = ${token} AND expires_at > NOW()
    `

    if (tokens.length === 0) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    // Hash new password
    const passwordHash = await hashPassword(password)

    // Update user password
    await sql`
      UPDATE users 
      SET password_hash = ${passwordHash}
      WHERE id = ${payload.id}
    `

    // Invalidate token
    await sql`
      DELETE FROM password_reset_tokens
      WHERE token = ${token}
    `

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
