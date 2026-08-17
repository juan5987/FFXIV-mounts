import { describe, expect, it } from 'vitest';

import { EXPANSION_OPTIONS, isExpansionId } from './expansion-options';

describe('isExpansionId', () => {
  it('accepts every configured expansion identifier', () => {
    for (const option of EXPANSION_OPTIONS) {
      expect(isExpansionId(option.value)).toBe(true);
    }
  });

  it('rejects non-expansion values and the all sentinel', () => {
    expect(isExpansionId('all')).toBe(false);
    expect(isExpansionId('Dawntrail')).toBe(false);
    expect(isExpansionId('')).toBe(false);
  });
});
