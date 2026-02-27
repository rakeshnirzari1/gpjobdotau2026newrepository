import { execSync } from 'child_process';

const cwd = '/vercel/share/v0-project';

try {
  console.log('=== Current branch ===');
  console.log(execSync('git branch -a', { cwd, encoding: 'utf-8' }));
  
  console.log('=== Git log (last 10) ===');
  console.log(execSync('git log --oneline -10', { cwd, encoding: 'utf-8' }));

  console.log('=== Git status ===');
  console.log(execSync('git status --short', { cwd, encoding: 'utf-8' }));

  console.log('=== Stash list ===');
  console.log(execSync('git stash list', { cwd, encoding: 'utf-8' }));

  console.log('=== Diff --name-only HEAD~1 ===');
  try {
    console.log(execSync('git diff --name-only HEAD~1', { cwd, encoding: 'utf-8' }));
  } catch(e) {
    console.log('Could not diff HEAD~1');
  }
} catch (e) {
  console.log('Error:', e.message);
}
