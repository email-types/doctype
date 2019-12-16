import { remove, version } from '../src';

const html = '<html><head><title>Title</title></head><body>Hello</body></html>';

describe('doctype set', () => {
  it('removes doctype from given html', () => {
    const result = remove(`${version('html-5')} ${html}`);
    expect(result).toBe(html);
  });

  it('returns html when there is not doctype to remove', () => {
    const result = remove(html);
    expect(result).toBe(html);
  });
});
