#!/bin/bash
cd /vercel/share/v0-project
git checkout HEAD -- app/globals.css
git checkout HEAD -- app/layout.tsx
git checkout HEAD -- app/page.tsx
git checkout HEAD -- app/about/page.tsx
git checkout HEAD -- app/contact/ContactPageClient.tsx
git checkout HEAD -- app/pricing/page.tsx
git checkout HEAD -- app/all-jobs/page.tsx
git checkout HEAD -- app/login/page.tsx
git checkout HEAD -- components/header.tsx
git checkout HEAD -- components/hero.tsx
git checkout HEAD -- components/footer.tsx
git checkout HEAD -- components/feature-cards.tsx
git checkout HEAD -- components/search-form.tsx
git checkout HEAD -- components/recent-jobs.tsx
git checkout HEAD -- components/info-section.tsx
git checkout HEAD -- components/job-card.tsx
git checkout HEAD -- tailwind.config.ts
echo "All files restored to original state"
