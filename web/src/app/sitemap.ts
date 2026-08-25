import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://victormedia.net';

  const routes = [
    '',
    '/news',
    '/articles',
    '/learning',
    '/notes',
    '/quizzes',
    '/games',
    '/tools',
    '/ai',
    '/search',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/dmca',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
