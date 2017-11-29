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
});
