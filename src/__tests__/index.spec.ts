import { RegexBuilder } from '../index';

describe('RegexBuilder', () => {
  it('should matchBegin', () => {
    expect(new RegexBuilder().matchBegin().build()).toBe('^');
  });

  it('should matchEnd', () => {
    expect(new RegexBuilder().matchEnd().build()).toBe('$');
  });

  it('zeroOrMoreOf', () => {
    expect(new RegexBuilder().zeroOrMoreOf('a').build()).toBe('a*');
    expect(new RegexBuilder().zeroOrMoreOf('abc').build()).toBe('(abc)*');
  });

  it('oneOrMoreOf', () => {
    expect(new RegexBuilder().oneOrMoreOf('a').build()).toBe('a+');
    expect(new RegexBuilder().oneOrMoreOf('abc').build()).toBe('(abc)+');
  });

  it('optional', () => {
    expect(new RegexBuilder().optional('a').build()).toBe('a?');
    expect(new RegexBuilder().optional('abc').build()).toBe('(abc)?');
  });

  it('anyOf', () => {
    expect(new RegexBuilder().anyOf(['a', 'b', 'c']).build()).toBe('(a|b|c)');
  });

  it('anySingleCharacter', () => {
    expect(new RegexBuilder().anySingleCharacter().build()).toBe('.');
  });

  it('formfeed', () => {
    expect(new RegexBuilder().formfeed().build()).toBe('\\f');
  });

  it('newline', () => {
    expect(new RegexBuilder().newline().build()).toBe('\\n');
  });

  it('carriageReturn', () => {
    expect(new RegexBuilder().carriageReturn().build()).toBe('\\r');
  });

  it('tab', () => {
    expect(new RegexBuilder().tab().build()).toBe('\\t');
  });

  it('anyDigit', () => {
    expect(new RegexBuilder().anyDigit().build()).toBe('\\d');
  });

  it('anyNonDigit', () => {
    expect(new RegexBuilder().anyNonDigit().build()).toBe('\\D');
  });

  it('whitespace', () => {
    expect(new RegexBuilder().whitespace().build()).toBe('\\s');
  });

  it('notAWhitespace', () => {
    expect(new RegexBuilder().notAWhitespace().build()).toBe('\\S');
  });

  it('anyWordCharacter', () => {
    expect(new RegexBuilder().anyWordCharacter().build()).toBe('\\w');
  });

  it('anyNonWordCharacter', () => {
    expect(new RegexBuilder().anyNonWordCharacter().build()).toBe('\\W');
  });
});
