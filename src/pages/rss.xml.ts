import rss from "@astrojs/rss"
import { SITE } from "@consts"
import { getBlogPosts, getProjects } from "@lib/appwrite-service"

type Context = {
  site: string
}

export async function GET(context: Context) {
  // Get data from Appwrite instead of Astro content collections
  const blogPosts = await getBlogPosts()
  const projects = await getProjects()
  
  // Combine and sort items by date (most recent first)
  const items = [...blogPosts, ...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((item) => ({
      title: item.title,
      description: item.summary,
      pubDate: item.date,
      link: item.$collectionId === process.env.VITE_APPWRITE_BLOG_COLLECTION_ID ? `/blog/${item.$id}/` : `/projects/${item.$id}/`,
    }))

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      link: item.link,
    })),
  })
}
