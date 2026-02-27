import { execSync } from 'child_process';

const files = [
  'app/globals.css',
  'app/layout.tsx',
  'app/page.tsx',
  'app/about/page.tsx',
  'app/contact/ContactPageClient.tsx',
  'app/pricing/page.tsx',
  'app/all-jobs/page.tsx',
  'app/login/page.tsx',
  'components/header.tsx',
  'components/hero.tsx',
  'components/footer.tsx',
  'components/feature-cards.tsx',
  'components/search-form.tsx',
  'components/recent-jobs.tsx',
  'components/info-section.tsx',
  'components/job-card.tsx',
  'tailwind.config.ts',
];

for (const file of files) {
  try {
    execSync(`git checkout origin/main -- ${file}`, { cwd: '/vercel/share/v0-project', stdio: 'pipe' });
    console.log(`Restored: ${file}`);
  } catch (e) {
    console.log(`Skipped (not in main): ${file}`);
  }
}

console.log('Done restoring all files to main branch state.');
