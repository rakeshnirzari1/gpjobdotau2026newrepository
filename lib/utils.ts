export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

export function createJobSlug(title: string, id: number | string): string {
  return `${slugify(title)}-${id}`
}

export function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/)
  return match ? match[1] : null
}

export const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(" ")
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount)
}
