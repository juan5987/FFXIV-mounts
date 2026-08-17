import { describe, expect, it } from 'vitest';

import { resolveTrustedImageUrl } from './trusted-image-url';

describe('resolveTrustedImageUrl', () => {
  const origins = ['https://xivapi.com'];

  it('accepts an HTTPS image from an allowed exact origin', () => {
    expect(resolveTrustedImageUrl('https://xivapi.com/i/000000/000001.png', 'https://xivapi.com', origins)).toBe(
      'https://xivapi.com/i/000000/000001.png',
    );
  });

  it('rejects untrusted URLs', () => {
    expect(resolveTrustedImageUrl('//xivapi.com/image.png', 'https://xivapi.com', origins)).toBeNull();
    expect(resolveTrustedImageUrl('http://xivapi.com/image.png', 'https://xivapi.com', origins)).toBeNull();
    expect(resolveTrustedImageUrl('https://user@xivapi.com/image.png', 'https://xivapi.com', origins)).toBeNull();
    expect(resolveTrustedImageUrl('https://cdn.xivapi.com/image.png', 'https://xivapi.com', origins)).toBeNull();
  });
});
