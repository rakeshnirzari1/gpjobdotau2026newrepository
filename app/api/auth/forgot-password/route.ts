import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { createToken } from "@/lib/auth"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const users = await sql`
      SELECT id, email, name FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      // For security reasons, we don't want to reveal whether an email exists or not
      // So we return a success response regardless
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a password reset link will be sent.",
      })
    }

    const user = users[0]

    // Generate a reset token
    const resetToken = await createToken({
      id: user.id,
      email: user.email,
      purpose: "password_reset",
    })

    // Store the token in the database with an expiration (1 hour)
    await sql`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${resetToken}, NOW() + INTERVAL '1 hour')
    `

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://gpjobs.au"}/reset-password?token=${resetToken}`

    // Send email with reset link
    try {
      // Create a test account if no SMTP credentials are provided
      let transporter

      if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Use provided SMTP credentials
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number.parseInt(process.env.SMTP_PORT),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })
      } else {
        // Use a test account for development
        const testAccount = await nodemailer.createTestAccount()
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        })
      }

      // Send the email
      const info = await transporter.sendMail({
        from: '"GPJobs.au" <noreply@gpjobs.au>',
        to: user.email,
        subject: "Password Reset Request",
        text: `Hello ${user.name},\n\nYou requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nRegards,\nGPJobs.au Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested a password reset. Please click the button below to reset your password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
            </p>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Regards,<br>GPJobs.au Team</p>
          </div>
        `,
      })

      console.log("Message sent: %s", info.messageId)

      // For development, log the test URL
      if (!process.env.SMTP_HOST) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      // We don't want to return an error to the user if email sending fails
      // The token is still created and can be used
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a password reset link will be sent.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
