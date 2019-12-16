[wiki-dtd]: https://en.wikipedia.org/wiki/Document_type_definition
[dtd-data]: ./src/data.ts

# Email Doctype

Easily manage your email's [Document Type Definition (DTD)][wiki-dtd].

Install with yarn

```sh
yarn add email-doctype
```

Or install with npm:

```sh
npm install email-doctype
```

## Doctypes

| Keys                     | Alias Prefix   | Alias Version | Alias Suffix          |
| :----------------------- | :------------- | :------------ | :-------------------- |
| `html-5`                 | `h` or `html`  | `5`           | n/a                   |
| `html-4.01-strict`       | `h` or `html`  | `4.01`        | `s` or `strict`       |
| `html-4.01-transitional` | `h` or `html`  | n/a           | `t` or `transitional` |
| `xhtml-1.1`              | `x` or `xhtml` | `1.1`         | n/a                   |
| `xhtml-1.0-strict`       | `x` or `xhtml` | `1` or `1.0`  | `s` or `strict`       |
| `xhtml-1.0-transitional` | `x` or `xhtml` | n/a           | `t` or `transitional` |

**Aliases**

While you can easily get a doctype using a `Key`, you can also use an alias. An
alias can be an `Alias Version` or string composing of an `Alias Prefix`,
`Alias Version`, and `Alias Suffix`.

- Casing will be normalized so `keys` and `aliases` are case insensitive
- Whitespace is removed so spaces are allowed
- When there is an `Alias Suffix` available but not used, the returned doctype
  will use the `strict` alias suffix

**Examples**

Checkout the [test](./test/index.test.ts) for more examples.

```ts
import * as doctype from 'email-doctype';

doctype.version('recommended');
doctype.version('html-1.0-transitional');
doctype.version('XHTML 1.0 Transitional');
// => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'

doctype.version(5);
doctype.version('html-5');
doctype.version('HTML 5');
// => '<!DOCTYPE html>'

doctype.version(4.01);
doctype.version('xhtml-4.01-strict');
// => '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'

doctype.version(1.1);
doctype.version('xhtml-1.1');
doctype.version('XHTML 1.1');
// => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'

doctype.version(1.0);
doctype.version('xhtml-1.0-strict');
doctype.version('XHTML 1.0 Strict');
// => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
```

## Extracting a doctype

Extract the doctype from a given html string.

```ts
import { extract } from 'email-doctype';

const html = '<!DOCTYPE html> <html><head></head><body></body></html>';

extract(html);
// => '<!DOCTYPE html>'
```

## Setting a doctype

Add a doctype to a given html string.

```ts
import { set } from 'email-doctype';

const html = '<html><head></head><body></body></html>';

set(html, 'HTML 5');
// => '<!DOCTYPE html> <html><head></head><body></body></html>'
```

**Automatic replacement**

When the given html contains a doctype, it will be automatically replaced with
your new doctype.

```ts
import { set } from 'email-doctype';

const html = '<!DOCTYPE html> <html><head></head><body></body></html>';

set(html, 'HTML 4.01');
// '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> <html><head></head><body></body></html>'
```

## Removing a doctype

Remove a given html string's doctype, returning just the html.

```ts
import { remove } from 'email-doctype';

const html = '<!DOCTYPE html> <html><head></head><body></body></html>';

remove(html);
// => '<html><head></head><body></body></html>'
```

## API

### version

```ts
version(alias: string): string
```

Gets a doctype from a given alias.

### extract

```ts
extract(html: string): string
```

Extracts the doctype from a given html string.

### set

```ts
set(html: string, alias: string = 'recommended'): string
```

Adds a doctype to a given html string.

### remove

```ts
remove(html: string): string
```

Removes a given html string's doctype, returning just the html.
