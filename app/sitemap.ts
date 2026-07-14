export const baseUrl = 'https://williamliu.vercel.app' // update after deploy

export default async function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
    },
  ]
}
