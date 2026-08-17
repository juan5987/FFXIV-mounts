export function resolveTrustedImageUrl(
  value: unknown,
  baseUrl: string,
  allowedOrigins: readonly string[],
): string | null {
  if (typeof value !== 'string' || value.trim().length === 0 || value.startsWith('//')) {
    return null;
  }

  try {
    const url = new URL(value, baseUrl);
    if (url.protocol !== 'https:' || url.username || url.password || !allowedOrigins.includes(url.origin)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
