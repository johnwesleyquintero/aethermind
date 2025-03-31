import { useStore } from '@nanostores/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { themeStore } from './lib/stores/theme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { trackPerformance } from './lib/stores/metrics';
import { ClientOnly } from 'remix-utils/client-only';

// Optimize stylesheet imports
import globalStyles from './styles/index.scss?url';
import '~/styles/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.json' },
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: globalStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossOrigin: 'anonymous',
  },
];

const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('aethermind_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Aethermind - Your Personal Dev Engineer" />
    <title>Aethermind</title>
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
  </>
));

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <ClientOnly>{() => <DndProvider backend={HTML5Backend}>{children}</DndProvider>}</ClientOnly>
      <ScrollRestoration />
      <Scripts />
    </>
  );
}

export default function App() {
  const theme = useStore(themeStore);

  useEffect(() => {
    // Start performance tracking
    const interval = setInterval(trackPerformance, 30000); // Every 30 seconds

    logStore.logSystem('Aethermind initialized', {
      theme,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <Layout>
        <Outlet />
      </Layout>
    </ErrorBoundary>
  );
}
