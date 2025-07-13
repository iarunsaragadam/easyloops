import { notFound } from 'next/navigation';
import { wikiSlugs } from '@/constants/wikiSlugs';
import ClientHeader from '@/shared/components/ClientHeader';
import WikiPageClient from './WikiPageClient';
import { loadAllWikiLanguages } from '@/shared/lib/wikiLoader';

interface WikiPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug } = await params;

  // Check if the slug is valid
  if (!wikiSlugs.includes(slug as (typeof wikiSlugs)[number])) {
    notFound();
  }

  try {
    // Load all language variants for this wiki page
    const allContent = await loadAllWikiLanguages(slug);

    return <WikiPageClient slug={slug} allContent={allContent} />;
  } catch (error) {
    console.error('Error loading wiki page:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ClientHeader showLanguageSelector={true} />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Wiki Page
            </h1>
            <p className="text-red-600 dark:text-red-400">
              Failed to load wiki content for: {slug}
            </p>
            <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-100">
              {String(error)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

// Generate static params for all wiki slugs
export async function generateStaticParams() {
  return wikiSlugs.map((slug) => ({
    slug,
  }));
}
