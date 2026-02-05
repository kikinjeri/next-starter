export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')       // spaces & underscores → hyphens
    .replace(/[^\w\-]+/g, '')       // remove non-word chars
    .replace(/\-\-+/g, '-')         // collapse multiple hyphens
    .replace(/^-+/, '')             // trim hyphens from start
    .replace(/-+$/, '');            // trim hyphens from end
}
