/**
 * sitemap.xml: trang lập lá số, hợp tuổi, cổ thư (sách + chương), kiến thức (14 sao × 12 cung)
 */

import type { MetadataRoute } from 'next';
import { ALL_BOOKS } from '@/lib/classics';
import { CAP_SLUG, getAllKnowledgeRoutes } from '@/lib/seo/knowledge';
import { SITE_URL } from '@/lib/site';

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date('2026-10-25');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/chart`, priority: 1.0, changeFrequency: 'weekly', lastModified: lastmod },
    { url: `${BASE_URL}/heming`, priority: 0.7, changeFrequency: 'weekly', lastModified: lastmod },
    { url: `${BASE_URL}/library`, priority: 0.85, changeFrequency: 'weekly', lastModified: lastmod },
    { url: `${BASE_URL}/knowledge`, priority: 0.9, changeFrequency: 'weekly', lastModified: lastmod },
    { url: `${BASE_URL}/knowledge/nhap-mon`, priority: 0.9, changeFrequency: 'monthly', lastModified: lastmod },
    { url: `${BASE_URL}/knowledge/cap-sao`, priority: 0.8, changeFrequency: 'monthly', lastModified: lastmod },
    ...CAP_SLUG.map(([slug]) => ({ url: `${BASE_URL}/knowledge/cap-sao/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: lastmod })),
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'monthly', lastModified: lastmod },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'monthly', lastModified: lastmod },
  ];

  // Cổ thư
  const libraryPages: MetadataRoute.Sitemap = ALL_BOOKS.flatMap(book => {
    const bookHome: MetadataRoute.Sitemap[number] = {
      url: `${BASE_URL}/library/${book.slug}`,
      priority: 0.75,
      changeFrequency: 'monthly',
      lastModified: lastmod,
    };
    const chapters: MetadataRoute.Sitemap = book.chapters.map((_, i) => ({
      url: `${BASE_URL}/library/${book.slug}/${i}`,
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: lastmod,
    }));
    return [bookHome, ...chapters];
  });

  // Kiến thức 14 × 12
  const knowledgePages: MetadataRoute.Sitemap = getAllKnowledgeRoutes().map(({ star, topic }) => ({
    url: `${BASE_URL}/knowledge/${star}/${topic}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: lastmod,
  }));

  return [...staticPages, ...libraryPages, ...knowledgePages];
}
