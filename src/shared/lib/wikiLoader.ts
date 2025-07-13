import fs from 'fs';
import path from 'path';

export type SupportedLanguage = 'python' | 'go';

/**
 * Loads wiki content for a specific language and slug.
 * First tries to load from language-specific file, then falls back to default.md in the folder.
 *
 * @param slug - The wiki slug (e.g., 'variable')
 * @param language - The programming language (e.g., 'python', 'go')
 * @returns Promise that resolves to the wiki content string
 */
export async function loadWikiContent(
  slug: string,
  language: SupportedLanguage
): Promise<string> {
  const wikiDir = path.join(process.cwd(), 'public', 'wiki');

  // First, try to load from language-specific directory structure
  const languageSpecificPath = path.join(wikiDir, slug, `${language}.md`);

  try {
    if (fs.existsSync(languageSpecificPath)) {
      const content = fs.readFileSync(languageSpecificPath, 'utf8');
      console.log(`✅ Loaded wiki content from ${languageSpecificPath}`);
      return content;
    }
  } catch {
    console.log(
      `ℹ️ No language-specific wiki content found for ${language} in ${slug}`
    );
  }

  // Fall back to default.md in the folder (if it exists)
  const defaultPath = path.join(wikiDir, slug, 'default.md');
  try {
    if (fs.existsSync(defaultPath)) {
      const content = fs.readFileSync(defaultPath, 'utf8');
      console.log(`📝 Using fallback wiki content from ${defaultPath}`);
      return content;
    }
  } catch (error) {
    console.error(`❌ Failed to load wiki content for ${slug}:`, error);
  }

  // Check if any language-specific files exist for this slug
  const availableLanguages = getAvailableLanguages(slug);
  if (availableLanguages.length > 0) {
    // If language-specific files exist but not for the requested language,
    // fall back to the first available language
    const fallbackLanguage = availableLanguages[0];
    const fallbackPath = path.join(wikiDir, slug, `${fallbackLanguage}.md`);
    try {
      const content = fs.readFileSync(fallbackPath, 'utf8');
      console.log(
        `🔄 Falling back to ${fallbackLanguage} content from ${fallbackPath}`
      );
      return content;
    } catch (error) {
      console.error(`❌ Failed to load fallback content for ${slug}:`, error);
    }
  }

  // If no content exists at all, return an error message
  return `# Wiki Content Not Found

The wiki content for "${slug}" in ${language} could not be found.

Available languages for this topic: ${availableLanguages.length > 0 ? availableLanguages.join(', ') : 'None'}

Please check that the wiki page exists and has been properly configured.`;
}

/**
 * Loads all available language variants for a wiki slug.
 *
 * @param slug - The wiki slug (e.g., 'variable')
 * @returns Promise that resolves to an object with language keys and content values
 */
export async function loadAllWikiLanguages(
  slug: string
): Promise<Record<SupportedLanguage, string>> {
  const languages: SupportedLanguage[] = ['python', 'go'];
  const content: Record<SupportedLanguage, string> = {} as Record<
    SupportedLanguage,
    string
  >;

  for (const language of languages) {
    content[language] = await loadWikiContent(slug, language);
  }

  return content;
}

/**
 * Checks if a wiki slug has language-specific content available.
 *
 * @param slug - The wiki slug (e.g., 'variable')
 * @param language - The programming language (e.g., 'python', 'go')
 * @returns boolean indicating if language-specific content exists
 */
export function hasLanguageSpecificContent(
  slug: string,
  language: SupportedLanguage
): boolean {
  const wikiDir = path.join(process.cwd(), 'public', 'wiki');
  const languageSpecificPath = path.join(wikiDir, slug, `${language}.md`);
  return fs.existsSync(languageSpecificPath);
}

/**
 * Gets the list of available languages for a wiki slug.
 *
 * @param slug - The wiki slug (e.g., 'variable')
 * @returns Array of available languages for this wiki page
 */
export function getAvailableLanguages(slug: string): SupportedLanguage[] {
  const languages: SupportedLanguage[] = ['python', 'go'];
  return languages.filter((language) =>
    hasLanguageSpecificContent(slug, language)
  );
}
