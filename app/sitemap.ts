export const baseUrl = 'https://www.wlmliu.com'

export default async function sitemap() {
  const routes = ['', '/inspirations', '/reading', '/coursework', '/attractor']
  const lastModified = new Date().toISOString().split('T')[0]
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }))
}
