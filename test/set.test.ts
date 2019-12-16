import { set, version } from '../src';

const html = '<html><head><title>Title</title></head><body>Hello</body></html>';

describe('doctype', () => {
  it('returns with the recommended doctype', () => {
    const result = set(html);
    expect(result).toBe(`${version('xhtml-1.0-transitional')} ${html}`);
  });

  it('returns with a doctype', () => {
    const result = set(html, 'HTML 5');
    expect(result).toBe(`${version('html-5')} ${html}`);
  });

  it('returns with a doctype using an alias', () => {
    const result = set(html, 5);
    expect(result).toBe(`${version('html-5')} ${html}`);
  });

  it('replaces current doctype with the recommended doctype', () => {
    const result = set(`<!DOCTYPE html> ${html}`);
    expect(result).toBe(`${version('xhtml-1.0-transitional')} ${html}`);
  });
});
