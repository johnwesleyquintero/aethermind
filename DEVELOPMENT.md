# Development Guide

## Prerequisites

### Node.js Setup

1. Install Node Version Manager (nvm):
   - Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
   - Unix/Mac: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

2. Install and use the correct Node.js version:
   ```bash
   nvm install 18.18.0
   nvm use 18.18.0
   ```

3. Verify installation:
   ```bash
   node --v # Should output v18.18.0
   ```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   - Copy `.env.example` to `.env.local`
   - Add required API key:
     ```bash
     GEMINI_API_KEY=xxx
     ```

3. Development:
   ```bash
   npm run dev
   ```

4. Production Build:
   ```bash
   npm run build
   ```

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Environment Variables

Required for Vercel:
- `GEMINI_API_KEY`: Google Gemini API key
- `NODE_VERSION`: 18.x

## Stack Overview

- **Framework**: React + Vite
- **Styling**: TailwindCSS
- **State**: Nanostores
- **AI**: Google Gemini