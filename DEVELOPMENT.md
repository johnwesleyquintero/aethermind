# Local Development Setup

1. Install Dependencies:
   ```bash
   pnpm install
   ```

2. Setup Environment:
   Create a `.env.local` file in the root directory with necessary environment variables.

3. Start Development Server:
   ```bash
   pnpm dev
   ```
   This will start the development server at http://localhost:5173

4. Building for Production:
   ```bash
   pnpm build
   ```

5. Running Production Build:
   ```bash
   pnpm start
   ```

## Deployment

The application is configured to deploy to Vercel at aethermind.vercel.app.
To deploy:
   ```
      https://github.com/johnwesleyquintero/aethermind.git
   ```
1. Connect your repository to Vercel
2. Configure the following build settings:
   - Framework Preset: Remix
   - Build Command: pnpm run build
   - Output Directory: build/client
   - Install Command: pnpm install

Remember to set up any required environment variables in your Vercel project settings.