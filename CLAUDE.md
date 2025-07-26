# Claude Development Notes

This file contains useful information for Claude when working on the koi-farm project.

## Project Overview

- **Tech Stack**: SvelteKit with Vite
- **Package Manager**: Yarn v4 (via corepack)
- **Node Version**: v22 (LTS, managed via nvm)
- **Deployment**: Netlify with custom domain happy.koifarm.modernduck.com
- **Adapter**: @sveltejs/adapter-netlify

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Deploy to Netlify
netlify deploy --prod --dir=build
```

## Node.js Environment

- Use Node.js v22 (latest LTS)
- Managed via nvm with `nvm use 22`
- Yarn v4 enabled via `corepack enable`

## AI Workflow

See [AI.md](./AI.md) for detailed development workflow including:

- Git branching strategy
- Commit practices
- Pull request process

## Deployment

- Site deployed at: https://koi-farm.netlify.app
- Custom domain: https://happy.koifarm.modernduck.com
- DNS managed through Dreamhost
- Auto-deploys from main branch via GitHub integration

## Project Context

This is a peaceful digital koi pond experience, created as a "vibe coding" project using various AI tools:

- Claude (Anthropic) - Main development
- Gemini (Google) - Koi images
- Suno - Background music
