import { execFileSync } from 'child_process';

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

// First check what branches/remotes exist
try {
  const branches = execFileSync('git', ['branch', '-a'], { cwd: '/vercel/share/v0-project' }).toString();
  console.log('=== Branches ===');
  console.log(branches);
} catch (e) {
  console.log('Error listing branches:', e.message);
}

try {
  const log = execFileSync('git', ['log', '--oneline', '-20'], { cwd: '/vercel/share/v0-project' }).toString();
  console.log('=== Recent commits ===');
  console.log(log);
} catch (e) {
  console.log('Error getting log:', e.message);
}

try {
  const status = execFileSync('git', ['status', '--short'], { cwd: '/vercel/share/v0-project' }).toString();
  console.log('=== Status ===');
  console.log(status);
} catch (e) {
  console.log('Error getting status:', e.message);
}

// Try to find the right ref to restore from
const refsToTry = ['origin/main', 'main', 'HEAD~1', 'HEAD~2', 'HEAD~3'];

for (const ref of refsToTry) {
  try {
    execFileSync('git', ['show', `${ref}:app/page.tsx`], { cwd: '/vercel/share/v0-project' });
    console.log(`\nFound valid ref: ${ref}`);
    
    // Now restore all files from this ref
    for (const file of files) {
      try {
        execFileSync('git', ['checkout', ref, '--', file], { cwd: '/vercel/share/v0-project' });
        console.log(`Restored: ${file}`);
      } catch (e) {
        console.log(`Skipped: ${file} - ${e.message}`);
      }
    }
    console.log('\nDone restoring!');
    break;
  } catch (e) {
    console.log(`Ref ${ref} not available: ${e.message}`);
  }
}
