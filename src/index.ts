import { Version, doctypes } from './data';

type GlobalsString = string & { _?: never };

type GlobalsNumber = number & { _?: never };

type Alias = Version | GlobalsString | GlobalsNumber;

const clean = (alias: Alias): string =>
  String(alias)
    .toLowerCase()
    .replace(/\.(01|0)/, '')
    .replace(/\b(html|transitional|xhtml)\b/g, (_: unknown, v: string) =>
      v.charAt(0),
    )
    .replace(/s(?:trict)?/, '')
    .replace(/(-|\.|\s)+/g, '');

const aliases = Object.keys(doctypes).reduce<Record<string, string>>(
  (acc, key) => {
    acc[clean(key)] = key;
    return acc;
  },
  {},
);

export const version = (alias: Alias): string => {
  const key = clean(alias);
  const name = aliases[key] || aliases[`h${key}`] || aliases[`x${key}`];
  const dtd = (doctypes as typeof aliases)[name] || doctypes[alias as Version];

  if (!dtd) {
    throw Error(`"${alias}" is not a valid doctype name`);
  }

  return dtd;
};

export const extract = (html: string): string | undefined => {
  const pattern = /<\s*!\s*doctype[^>]*>/im;
  const match = pattern.exec(html);
  return (match && match[0]) || undefined;
};

export const set = (html: string, alias: Alias = 'recommended'): string => {
  const curr = extract(html);
  const next = version(alias);
  return !curr ? `${next} ${html}` : html.replace(curr, next);
};

export const remove = (html: string): string => {
  const curr = extract(html);
  return !curr ? html : html.replace(curr, '').trim();
};

export { Version, Alias };
