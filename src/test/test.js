import { expect } from 'chai';
import Capitalize from '../index';
import standardConfig from '../config/standard';

describe('Capitalize', () => {
  it('initializes this.config', () => {
    const config = ['hello', 'world'];
    const capitalize = new Capitalize(config);
    expect(capitalize.config).to.eql(config);
    const capitalize2 = new Capitalize();
    expect(capitalize2.config).to.eql(standardConfig);
  });

  describe('#typecheckConfig()', () => {
    it('returns false if config param is not of type Array', () => {
      const config = {};
      const capitalize = new Capitalize();
      expect(capitalize.typecheckConfig(config)).to.equal(false);
    });

    it('returns whether config param is of type Array<string>', () => {
      let config = ['hello', 5, { x: 'world' }];
      const capitalize = new Capitalize();
      expect(capitalize.typecheckConfig(config)).to.equal(false);
      config = ['hello', 'world'];
      expect(capitalize.typecheckConfig(config)).to.equal(true);
    });
  });

  describe('#handleConfig()', () => {
    it('throws TypeError when #typecheckConfig() returns false', () => {
      let config = {};
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const capitalize = new Capitalize(config);
      }).to.throw(TypeError);
      config = ['hello', 2, { x: 'world' }];
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const capitalize = new Capitalize(config);
      }).to.throw(TypeError);
    });

    it('returns standardConfig when config param is empty Array', () => {
      const config = [];
      const capitalize = new Capitalize(config);
      expect(capitalize.handleConfig(config)).to.eql(standardConfig);
    });

    it('transforms config param to lowercase', () => {
      const config = ['HELLO', 'World'];
      const capitalize = new Capitalize(config);
      expect(capitalize.handleConfig(config)).to.eql(['hello', 'world']);
    });
  });

  describe('#applyTitleCase()', () => {
    it('returns original string param if no strings in config exist in string param', () => {
      const config = ['foo', 'bar'];
      const string = 'hello world';
      const capitalize = new Capitalize(config);
      expect(capitalize.applyTitleCase(string)).to.equal(string);
    });

    it('applies title case if any string(s) in config exist in string param', () => {
      const config = ['bar', 'foo', 'hello', 'world'];
      const string = 'Hello World Foo Bar';
      const titleCase = 'Hello world foo Bar';
      const capitalize = new Capitalize(config);
      expect(capitalize.applyTitleCase(string)).to.equal(titleCase);
    });
  });

  describe('#isMatch()', () => {
    it('returns whether any string in words param exists in this.config', () => {
      const config = ['hello', 'world'];
      let words = ['foo', 'world', 'bar'];
      const capitalize = new Capitalize(config);
      expect(capitalize.isMatch(words)).to.equal(true);
      words = ['foo', 'bar'];
      expect(capitalize.isMatch(words)).to.equal(false);
    });
  });

  describe('#cleanPunctuation()', () => {
    it('returns original word if it does not include punctuation', () => {
      const capitalize = new Capitalize();
      const word = 'foo';
      expect(capitalize.cleanPunctuation(word)).to.equal(word);
    });

    it('returns original word if it does not exist in config', () => {
      const config = ['hello', 'world'];
      const capitalize = new Capitalize(config);
      const word = 'foo';
      expect(capitalize.cleanPunctuation(word)).to.equal(word);
    });

    it('removes punctuation from word', () => {
      const config = ['hello', 'world'];
      const capitalize = new Capitalize(config);
      const word = 'world,';
      expect(capitalize.cleanPunctuation(word)).to.equal('world');
    });
  });

  describe('#handleUpperCase()', () => {
    it('capitalizes first char of word', () => {
      const capitalize = new Capitalize();
      const word = 'foo';
      expect(capitalize.handleUpperCase(word)).to.equal('Foo');
    });

    it('capitalizes second char of word if first char is recongnized as punctuation', () => {
      const capitalize = new Capitalize();
      const word = '"foo"';
      expect(capitalize.handleUpperCase(word)).to.equal('"Foo"');
    });
  });
});
