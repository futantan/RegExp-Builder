import { RegexBuilder } from '../index';

describe('RegexBuilder', () => {
  it('should matchBegin', () => {
    expect(new RegexBuilder().matchBegin().toString()).toBe('/^/');
  });

  it('should matchEnd', () => {
    expect(new RegexBuilder().matchEnd().toString()).toBe('/$/');
  });

  it('zeroOrMoreOf', () => {
    expect(new RegexBuilder().zeroOrMoreOf('a').toString()).toBe('/a*/');
    expect(new RegexBuilder().zeroOrMoreOf('abc').toString()).toBe('/(?:abc)*/');
  });

  it('oneOrMoreOf', () => {
    expect(new RegexBuilder().oneOrMoreOf('a').toString()).toBe('/a+/');
    expect(new RegexBuilder().oneOrMoreOf('abc').toString()).toBe('/(?:abc)+/');
  });

  it('optional', () => {
    expect(new RegexBuilder().optional('a').toString()).toBe('/a?/');
    expect(new RegexBuilder().optional('abc').toString()).toBe('/(?:abc)?/');
  });

  it('anyOf', () => {
    expect(new RegexBuilder().anyOf(['a', 'b', 'c']).toString()).toBe('/(a|b|c)/');
  });

  it('nTimesOf', () => {
    expect(new RegexBuilder().nTimesOf('hello', 3).toString()).toBe('/hello{3}/');
  });

  it('moreThanNTimesOf', () => {
    expect(new RegexBuilder().moreThanNTimesOf('hello', 3).toString()).toBe('/hello{3,}/');
  });

  it('expressionTimesBetween', () => {
    expect(new RegexBuilder().expressionTimesBetween('hello', 3, 6).toString()).toBe('/hello{3,6}/');
  });

  it('anySingleCharacter', () => {
    expect(new RegexBuilder().anySingleCharacter().toString()).toBe('/./');
  });

  it('formfeed', () => {
    expect(new RegexBuilder().formfeed().toString()).toBe('/\\f/');
  });

  it('newline', () => {
    expect(new RegexBuilder().newline().toString()).toBe('/\\n/');
  });

  it('carriageReturn', () => {
    expect(new RegexBuilder().carriageReturn().toString()).toBe('/\\r/');
  });

  it('tab', () => {
    expect(new RegexBuilder().tab().toString()).toBe('/\\t/');
  });

  it('anyDigit', () => {
    expect(new RegexBuilder().anyDigit().toString()).toBe('/\\d/');
  });

  it('anyNonDigit', () => {
    expect(new RegexBuilder().anyNonDigit().toString()).toBe('/\\D/');
  });

  it('whitespace', () => {
    expect(new RegexBuilder().whitespace().toString()).toBe('/\\s/');
  });

  it('notAWhitespace', () => {
    expect(new RegexBuilder().notAWhitespace().toString()).toBe('/\\S/');
  });

  it('anyWordCharacter', () => {
    expect(new RegexBuilder().anyWordCharacter().toString()).toBe('/\\w/');
  });

  it('anyNonWordCharacter', () => {
    expect(new RegexBuilder().anyNonWordCharacter().toString()).toBe('/\\W/');
  });

  it('capture', () => {
    expect(new RegexBuilder().capture('hello').toString()).toBe('/(hello)/');
  });

  it('nonCapture', () => {
    expect(new RegexBuilder().nonCapture('hello').toString()).toBe('/(?:hello)/');
  });

  it('positiveLookahead', () => {
    expect(new RegexBuilder().positiveLookahead('hello').toString()).toBe('/(?=hello)/');
  });

  it('negativeLookahead', () => {
    expect(new RegexBuilder().negativeLookahead('hello').toString()).toBe('/(?!hello)/');
  });

  it('aSingleCharacterInString', () => {
    expect(new RegexBuilder().aSingleCharacterInString('hello').toString()).toBe('/[hello]/');
  });

  it('anySingleCharacterExcept', () => {
    expect(new RegexBuilder().anySingleCharacterExcept('abc').toString()).toBe('/[^abc]/');
  })

});
