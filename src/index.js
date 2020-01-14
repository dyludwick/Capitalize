import standardConfig from './config/standard';

/** Helper Class with text-processing functionality. */
class Capitalize {
  /**
   * Create a Capitalize class instance.
   *
   * @param {Array<string>} config - Exceptions to capitalization when applying
   * title case. When undefined, defaults to standard.
   */
  constructor(config) {
    this.config = config
      ? this.handleConfig(config)
      : standardConfig;
    this.punctuation = [',', ';', ':', "'", '"'];
  }

  /**
   * Check the type of a given config.
   *
   * @param {Array<string>} config - The config to be type-checked.
   * @return {boolean} Whether config param is of type Array<string>.
   */
  typecheckConfig(config) {
    if (!Array.isArray(config)) {
      return false;
    }
    const isNotString = (element) => typeof element !== 'string';

    return !config.some(isNotString);
  }

  /**
   * Transform elements to lower case if custom config supplied, otherwise
   * return standard config.
   *
   * @param {Array<string>} config - The config to be transformed.
   * @return {Array<string>} The transformed config.
   */
  handleConfig(config) {
    if (!this.typecheckConfig(config)) {
      throw new TypeError('config must be of type Array<string>', 'index.js', 34);
    }
    if (config.length === 0) {
      return standardConfig;
    }

    return config.map(word => word.toLowerCase());
  }

  /**
   * Apply title case to a given string.
   *
   * @param {string} string - The string to be transformed.
   * @return {string} The transformed string.
   */
  applyTitleCase(string) {
    const words = string.split(' ').map(word => word.toLowerCase());

    if (this.isMatch(words)) {
      let result = words.map((word, index) => {
        const transform = index === 0 ||
          index === words.length - 1 ||
          !this.config.includes(this.cleanPunctuation(word));

        if (transform) {
          return this.handleUpperCase(word);
        }

        return word;
      });
      result = result.join(' ');

      return result;
    }

    return string;
  }

  /**
   * Determine wether any strings in a given 'words' array match the
   * config.
   *
   * @param {Array<String>} words - The array of words to be compared to the
   * config.
   * @return {boolean} Whether a match exists.
   */
  isMatch(words) {
    const match = words.some(
      word => this.config.indexOf(this.cleanPunctuation(word)) >= 0
    );

    return match;
  }

  /**
   * Remove punctuation from a given string.
   *
   * @param {string} word - The string to be parsed.
   * @return {string} The parsed string.
   */
  cleanPunctuation(word) {
    const wordChars = word.split('');
    const shouldClean = wordChars.some(char => this.punctuation.includes(char));
    if (shouldClean) {
      const puncChars = this.punctuation.join('');
      const regex = new RegExp(`[${puncChars}]`, 'g');
      const cleaned = word.replace(regex, '');

      return this.config.includes(cleaned) ? cleaned : word;
    }

    return word;
  }

  /**
   * Capitalize first letter of string.
   *
   * @param {string} word - The string to be parsed.
   * @return {string} The parsed string.
   */
  handleUpperCase(word) {
    const chars = word.split('');
    const firstChar = chars[0];

    if (this.punctuation.includes(firstChar)) {
      chars[1] = chars[1].toUpperCase();
    } else {
      chars[0] = chars[0].toUpperCase();
    }

    return chars.join('');
  }
}

export default Capitalize;
