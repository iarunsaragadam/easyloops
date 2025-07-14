# SEO Strategy for Multiple Domains

## Current Situation

EasyLoops is currently accessible via:

- **Primary Domain**: `easyloops.app` (recommended canonical domain)
- **Secondary Domain**: `easyloops.web.app` (Firebase hosting default)

## SEO Strategy Implementation

### 1. Canonical URLs (✅ Implemented)

All pages now include canonical URLs pointing to `easyloops.app`:

```html
<link
  rel="canonical"
  href="https://easyloops.app/questions/01-variable-declaration"
/>
```

**Files Updated:**

- `src/app/layout.tsx` - Root metadata with canonical base
- `src/app/questions/[questionId]/layout.tsx` - Dynamic canonical URLs for questions
- `src/app/questions/page.tsx` - Questions listing page
- `src/app/wiki/[slug]/page.tsx` - Wiki pages

### 2. Sitemap Generation (✅ Implemented)

Dynamic sitemap at `https://easyloops.app/sitemap.xml` includes:

- All question pages
- All wiki pages
- Static pages (home, questions listing)

**File Created:** `src/app/sitemap.ts`

### 3. Robots.txt (✅ Implemented)

Robots.txt file at `https://easyloops.app/robots.txt` with:

- Allow all crawlers
- Sitemap location
- Disallow admin/API areas

**File Created:** `public/robots.txt`

### 4. Security Headers (✅ Implemented)

Added security headers in Firebase configuration:

- `X-Robots-Tag: index, follow`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

**File Updated:** `firebase.json`

## Domain Management Recommendations

### Option 1: Redirect Strategy (Recommended)

Set up 301 redirects from `easyloops.web.app` to `easyloops.app`:

```bash
# In Firebase Console or hosting provider
# Redirect all traffic from easyloops.web.app to easyloops.app
```

**Benefits:**

- Consolidates SEO value to primary domain
- Maintains user experience
- Prevents duplicate content issues

### Option 2: Domain Consolidation

1. **Update all internal links** to use `easyloops.app`
2. **Update documentation** and README files
3. **Update social media** and external links
4. **Monitor Google Search Console** for both domains

### Option 3: Subdomain Strategy

If you want to keep both domains:

- `easyloops.app` - Main application
- `easyloops.web.app` - Development/staging (with noindex)

## Implementation Checklist

### Immediate Actions (✅ Completed)

- [x] Add canonical URLs to all pages
- [x] Create dynamic sitemap
- [x] Add robots.txt
- [x] Configure security headers
- [x] Update metadata with proper Open Graph tags

### Next Steps

- [ ] Set up 301 redirects from `easyloops.web.app` to `easyloops.app`
- [ ] Update all internal links to use `easyloops.app`
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor search performance for both domains
- [ ] Update external links and documentation

### Long-term Monitoring

- [ ] Track search rankings for both domains
- [ ] Monitor crawl statistics in Google Search Console
- [ ] Check for duplicate content issues
- [ ] Analyze user behavior and conversion rates

## Google Search Console Setup

1. **Add both domains** to Google Search Console
2. **Set preferred domain** to `easyloops.app`
3. **Submit sitemap** for both domains
4. **Monitor for duplicate content** warnings
5. **Track search performance** metrics

## Expected Outcomes

### Short-term (1-2 weeks)

- Reduced duplicate content issues
- Clear canonical domain establishment
- Better crawl efficiency

### Medium-term (1-3 months)

- Consolidated SEO value to primary domain
- Improved search rankings
- Better user experience consistency

### Long-term (3-6 months)

- Single strong domain authority
- Simplified analytics and tracking
- Reduced maintenance overhead

## Monitoring and Maintenance

### Weekly Checks

- Google Search Console for crawl errors
- Sitemap submission status
- Canonical URL implementation

### Monthly Reviews

- Search performance metrics
- Domain authority changes
- User behavior analysis

### Quarterly Audits

- Complete SEO audit
- Technical SEO review
- Content optimization opportunities

## Troubleshooting

### Common Issues

1. **Duplicate Content Warnings**
   - Ensure canonical URLs are properly implemented
   - Check for any remaining internal links to secondary domain

2. **Crawl Errors**
   - Verify robots.txt is accessible
   - Check sitemap submission status
   - Monitor for 404 errors

3. **Indexing Issues**
   - Submit sitemap to search engines
   - Request indexing for important pages
   - Monitor crawl statistics

### Performance Metrics to Track

- **Organic Traffic** - Monitor traffic from both domains
- **Search Rankings** - Track keyword positions
- **Crawl Statistics** - Monitor search engine crawling
- **User Engagement** - Track bounce rate, time on site
- **Conversion Rates** - Monitor goal completions

## Conclusion

This SEO strategy ensures that:

1. **Search engines understand** the canonical domain
2. **SEO value is consolidated** to the primary domain
3. **User experience remains consistent** across domains
4. **Technical SEO is optimized** for better rankings
5. **Monitoring and maintenance** are simplified

The implementation focuses on establishing `easyloops.app` as the authoritative domain while maintaining accessibility through `easyloops.web.app` until redirects are implemented.
