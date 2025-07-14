import { MetadataRoute } from 'next';
import { getAvailableQuestions } from '@/shared/lib';
import { wikiSlugs } from '@/constants/wikiSlugs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://easyloops.app';

  // Get all questions
  const questions = await getAvailableQuestions();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Question pages
  const questionPages = questions.map((questionId) => ({
    url: `${baseUrl}/questions/${questionId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Wiki pages
  const wikiPages = wikiSlugs.map((slug) => ({
    url: `${baseUrl}/wiki/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...questionPages, ...wikiPages];
}
