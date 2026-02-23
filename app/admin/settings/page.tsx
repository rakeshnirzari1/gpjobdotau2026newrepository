import { sql } from "@/lib/db"
import { AdminSettingsForm } from "@/components/admin-settings-form"
import { requireAdmin } from "@/lib/auth"

async function getSettings() {
  try {
    const settings = await sql`
      SELECT * FROM site_settings 
      WHERE id = 1
    `

    return settings.length > 0
      ? settings[0]
      : {
          id: 1,
          payment_required: true,
          job_price: 5000, // $50.00 in cents
          created_at: new Date(),
          updated_at: new Date(),
        }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {
      id: 1,
      payment_required: true,
      job_price: 5000, // $50.00 in cents
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}

export default async function AdminSettingsPage() {
  await requireAdmin()
  const settings = await getSettings()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <AdminSettingsForm settings={settings} />
      </div>
    </div>
  )
}
