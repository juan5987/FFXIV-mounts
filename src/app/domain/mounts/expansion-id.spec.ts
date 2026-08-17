import { describe, expect, it } from 'vitest';

import { ExpansionId, parseExpansionId, serializeExpansionId } from './expansion-id';

describe('ExpansionId', () => {
  it('parses only catalogued expansion values', () => {
    expect(parseExpansionId(ExpansionId.Heavensward)).toBe(ExpansionId.Heavensward);
    expect(parseExpansionId('Unknown')).toBeNull();
    expect(parseExpansionId(null)).toBeNull();
  });

  it('serializes a valid expansion value', () => {
    expect(serializeExpansionId(ExpansionId.Endwalker)).toBe('Endwalker');
  });
});
