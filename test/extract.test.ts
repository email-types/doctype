import { extract, version } from '../src';

const html = '<html><head><title>Title</title></head><body>Hello</body></html>';

describe('doctype', () => {
  it('returns a doctype', () => {
    const result = extract(`${version('html-5')} ${html}`);
    expect(result).toBe(version('HTML 5'));
  });

  it('returns undefined when there is not doctype', () => {
    const result = extract(html);
    expect(result).toBeUndefined();
  });
});
