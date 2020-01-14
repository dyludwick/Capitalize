# Capitalize
### Text-processing Helper Class

The text-transform CSS property is useful for specifying capitalization in some cases, but falls short when we want to apply title case to an element's text. Giving text-transform the value of "capitalize" converts the first letter of each word to uppercase, however title case has more specific rules, such as leaving articles, coordinating conjunctions, and propositions lowercase. Capitalize is a JavaScript helper class built to solve this problem:

CSS text-transform property:
```
Of The People, By The People, For The People
```
Capitalize.applyTitleCase():
```
Of the People, by the People, for the People
```

## Getting Started

Capitalize is built for use in both browser and node.

1. `npm install`
2. `npm run build`
3. Incorperate `dist/Capitalize.js` into project.

## Example

```javascript
import Capitalize from './your-path/Capitalize.js';

const capitalize = new Capitalize();
const titleCase = capitalize.applyTitleCase('say hello to the world');

console.log(titleCase);
// expected output: 'Say Hello to the World'
```

## Configuration

Capitalize constructor takes an optional `config` parameter - an array of strings that are exceptions to capitalization when applying title case. If no config parameter is passed, Capitalize defaults to a general rule recommended in The U.S. Government Printing Office Style Manual:

> "Capitalize all words in titles of publications and documents, except a, an, the, at, by, for, in, of, on, to, up, and, as, but, or, and nor."

**Note:** As per title case rules, the first and last words in a string will be capitalized regardless of wether that word appears in `config`.

```javascript
import Capitalize from './your-path/Capitalize.js';

const config = ['foo', 'bar'];
const capitalize = new Capitalize();
const titleCase = capitalize.applyTitleCase('mother says never trust a foo bar');

console.log(titleCase);
// expected output: 'Mother Says Never Trust A foo Bar'
```

## Punctuation

The following characters are recognized as punctuation and do not interfere with word recognition:
```
, ; : ' "
```

## Testing

- `npm test`

## Future Direction
 - Add support for international characters
 - Expand punctuation recognition
 - Add additional configuration options based on existing style guides
 - Register as npm module





