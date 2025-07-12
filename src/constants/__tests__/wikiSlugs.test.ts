import { wikiSlugs, questionSlugs, WikiSlug } from '../wikiSlugs';

describe('wikiSlugs constants', () => {
  describe('wikiSlugs', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(wikiSlugs)).toBe(true);
      expect(wikiSlugs.length).toBeGreaterThan(0);
    });

    it('should contain expected wiki concepts', () => {
      const expectedConcepts = [
        'recursion',
        'data-types',
        'loops',
        'functions',
        'arrays',
        'strings',
        'conditionals',
        'sorting',
        'searching',
        'graphs',
        'trees',
        'dynamic-programming',
        'algorithms',
        'data-structures',
      ];

      expectedConcepts.forEach((concept) => {
        expect(wikiSlugs).toContain(concept);
      });
    });

    it('should contain only lowercase strings with hyphens', () => {
      wikiSlugs.forEach((slug) => {
        expect(typeof slug).toBe('string');
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        expect(slug).toBe(slug.toLowerCase());
      });
    });

    it('should not contain duplicates', () => {
      const uniqueSlugs = new Set(wikiSlugs);
      expect(uniqueSlugs.size).toBe(wikiSlugs.length);
    });
  });

  describe('questionSlugs', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(questionSlugs)).toBe(true);
      expect(questionSlugs.length).toBeGreaterThan(0);
    });

    it('should contain expected question slugs', () => {
      const expectedQuestions = [
        '01-variable-declaration',
        '02-data-types',
        '03-arithmetic-operators',
        '04-basic-input-output',
        '05-comparison-operators',
        '06-logical-operators',
        '07-string-operations',
        '08-constants-immutable',
        '09-if-else-statements',
        '10-nested-conditionals',
        '11-switch-case-statements',
        '12-for-loops-basic-iteration',
        '13-while-loops',
        '14-do-while-loops-where-applicable',
        '15-nested-loops',
        '16-loop-control-break-continue',
        '17-range-based-loops',
        '18-arrays-declaration-and-initialization',
        '19-array-traversal-and-modification',
        '20-multi-dimensional-arrays',
      ];

      expectedQuestions.forEach((question) => {
        expect(questionSlugs).toContain(question);
      });
    });

    it('should contain only strings with proper question format', () => {
      questionSlugs.forEach((slug) => {
        expect(typeof slug).toBe('string');
        expect(slug).toMatch(/^\d{2}-[a-z-]+$/);
      });
    });

    it('should not contain duplicates', () => {
      const uniqueSlugs = new Set(questionSlugs);
      expect(uniqueSlugs.size).toBe(questionSlugs.length);
    });
  });

  describe('Type definitions', () => {
    it('should have proper TypeScript types', () => {
      // Test that WikiSlug type works correctly
      const testSlug: WikiSlug = 'recursion';
      expect(typeof testSlug).toBe('string');
      expect(wikiSlugs).toContain(testSlug);
    });

    it('should have consistent types between arrays and type definition', () => {
      // This test ensures type safety
      const allWikiSlugs: WikiSlug[] = [...wikiSlugs];
      expect(allWikiSlugs).toEqual(wikiSlugs);
    });
  });

  describe('No overlap between wiki and question slugs', () => {
    it('should not have overlapping slugs between wiki and question arrays', () => {
      const wikiStrings = wikiSlugs.map((s) => String(s));
      const questionStrings = questionSlugs.map((s) => String(s));

      const intersection = wikiStrings.filter((slug) =>
        questionStrings.includes(slug)
      );
      expect(intersection.length).toBe(0);
    });
  });

  describe('Slug validation', () => {
    it('should have valid URL-safe slugs', () => {
      const allSlugs = [...wikiSlugs, ...questionSlugs] as string[];

      allSlugs.forEach((slug) => {
        // Should only contain lowercase letters, numbers, and hyphens
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        // Should not start or end with hyphen
        expect(slug).not.toMatch(/^-|-$/);
        // Should not have consecutive hyphens
        expect(slug).not.toMatch(/--/);
      });
    });

    it('should have reasonable slug lengths', () => {
      const allSlugs = [...wikiSlugs, ...questionSlugs] as string[];

      allSlugs.forEach((slug) => {
        expect(slug.length).toBeGreaterThan(0);
        expect(slug.length).toBeLessThan(100); // Reasonable max length
      });
    });
  });
});
