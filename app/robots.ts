import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/llms.txt'],
      disallow: '/private/',
    },
    sitemap: 'https://westufer-kemnade.de/sitemap.xml',
  };
}
