import { siteConfig } from '@/config/site.config';
import type { Metadata } from 'next';

export function generateMetadata(
  title?: string,
  description?: string
): Metadata {
  return {
    title: title ?? siteConfig.title,
    description: description ?? siteConfig.description,
    openGraph: {
      title: title ?? siteConfig.title,
      description: description ?? siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [siteConfig.ogImage],
      type: 'website'
    }
  };
}
