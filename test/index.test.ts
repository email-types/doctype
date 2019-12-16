import * as doctype from '../src';

const specs: Array<{
  name: string;
  queries: doctype.Alias[];
  expected: string;
}> = [
  {
    name: 'returns the recommended doctype',
    queries: ['recommended'],
    expected: doctype.version('xhtml-1.0-transitional'),
  },
  {
    name: 'returns an HTML 5 doctype',
    queries: [5, '5', 'h 5', 'html 5', 'html-5', 'HTML 5'],
    expected: doctype.version('html-5'),
  },
  {
    name: 'returns an HTML 4.01 Strict doctype',
    queries: [
      4,
      4.01,
      '4.01',
      'h 4.01',
      'h-4.01',
      'html 4.01',
      'html-4.01',
      '4.01s',
      '4.01-s',
      'h 4.01 s',
      'h-4.01-s',
      'html 4.01 strict',
      'html-4.01-strict',
      'HTML 4.01 Strict',
    ],
    expected: doctype.version('html-4.01-strict'),
  },
  {
    name: 'returns an HTML 4.01 Transitional doctype',
    queries: [
      '4.01t',
      '4.01-t',
      'h 4.01 t',
      'h-4.01-t',
      'html 4.01 transitional',
      'html-4.01-transitional',
      'HTML 4.01 Transitional',
    ],
    expected: doctype.version('html-4.01-transitional'),
  },
  {
    name: 'returns an XHTML 1.1 doctype',
    queries: [
      1.1,
      1.1,
      '1.1',
      'x 1.1',
      'x-1.1',
      'xhtml 1.1',
      'xhtml-1.1',
      'XHTML 1.1',
    ],
    expected: doctype.version('xhtml-1.1'),
  },
  {
    name: 'returns an XHTML 1.0 Strict doctype',
    queries: [
      1,
      1.0,
      '1.0',
      'x 1.0',
      'x-1.0',
      'xhtml 1.0',
      'xhtml-1.0',
      '1.0s',
      '1.0-s',
      'x 1.0 s',
      'x-1.0-s',
      'xhtml 1.0 strict',
      'xhtml-1.0-strict',
      'XHTML 1.0 Strict',
    ],
    expected: doctype.version('xhtml-1.0-strict'),
  },
  {
    name: 'returns an XHTML 1.0 Transitional doctype',
    queries: [
      '1.0t',
      '1.0-t',
      'x 1.0 t',
      'x-1.0-t',
      'xhtml 1.0 transitional',
      'xhtml-1.0-transitional',
      'XHTML 1.0 Transitional',
    ],
    expected: doctype.version('xhtml-1.0-transitional'),
  },
];

describe('doctype', () => {
  specs.forEach((spec) => {
    it(spec.name, () => {
      spec.queries.forEach((query) => {
        const result = doctype.version(query);
        expect(result).toBe(spec.expected);
      });
    });
  });

  it('throws an error when given an incorrect name', () => {
    expect(() => doctype.version('foobar')).toThrow(
      '"foobar" is not a valid doctype name',
    );
  });
});
