import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Fetch published blog posts
    const posts = await base44.asServiceRole.entities.BlogPost.list();
    const publishedPosts = posts.filter(p => p.status === 'published');
    
    // Base URL - adjust based on your domain
    const baseUrl = 'https://daaem.com.sa';
    
    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/Blog', priority: '0.9', changefreq: 'daily' },
    ];
    
    // Blog post pages
    const blogPages = publishedPosts.map(post => ({
      url: `/BlogPost?slug=${post.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: new Date(post.updated_date).toISOString().split('T')[0],
    }));
    
    // Generate XML
    const urls = [...staticPages, ...blogPages];
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    return new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});