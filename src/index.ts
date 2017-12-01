enum RegexpGroup {
  Capture,
  NonCapture,
  PositiveLookahead,
  NegativeLookahead,
}

export class RegexBuilder {
  private _matchBegin: boolean = false;
  private _matchEnd: boolean = false;
  private _regStr: string = '';

  // // flags
  // private _globalSearch: boolean = false;    // g
  // private _caseInsensitive: boolean = false; // i
  // private _multiLineSearch: boolean = false; // m
  // private _unicode: boolean = false;         // u
  // private _sticky: boolean = false;          // y

  /**
   * All characters are treated literally except for the control characters
   * and following special characters
   */
  // private _specialcharacters = [
  //   '\\', '/', '[', ']', '(', ')', '{', '}', '?', '+', '*', '|', '.', '^', '$',
  // ];

  matchBegin = () => { this._matchBegin = true; return this; };
  matchEnd = () => { this._matchEnd = true; return this; };

  // ==================================== QUANTIFIER ====================================

  zeroOrMoreOf = (expression: string) => {
    this._regStr += `${this._addParenthesesIfNeed(expression)}*`;
    return this;
  }

  oneOrMoreOf = (expression: string) => {
    this._regStr += `${this._addParenthesesIfNeed(expression)}+`;
    return this;
  }

  optional = (expression: string) => {
    this._regStr += `${this._addParenthesesIfNeed(expression)}?`;
    return this;
  }

  /**
   * A regexp contains one or more string sequences.
   * The sequences are separated by the | (vertical bar) character.
   * The choice matches if any of the sequences match.
   * It attempts to match each of the sequences in order.
   *
   * The regex : `|`
   */
  anyOf = (choices: string[]) => {
    this._regStr += `(${choices.join('|')})`;
    return this;
  }

  /**
   * The regex : `xx{n}`
   */
  nTimesOf = (expression: string, count: number) => {
    this._regStr += `${expression}{${count}}`;
    return this;
  }

  /**
   * N times of expression or more
   * The regex : `xx{n,}`
   */
  moreThanNTimesOf = (expression: string, count: number) => {
    this._regStr += `${expression}{${count},}`;
    return this;
  }

  expressionTimesBetween = (expression: string, from: number, to: number) => {
    this._regStr += `${expression}{${from},${to}}`;
    return this;
  }

  /**
   * Any single character
   *
   * The regex: `.`
   */
  anySingleCharacter = () => { this._regStr += '.'; return this; }

  // ==================================== ESCAPE ====================================

  /**
   * Formfeed character
   *
   * The regex: `\f`
   */
  formfeed = () => { this._regStr += '\\f'; return this; };

  /**
   * Newline character
   * The regex: '\n'
   */
  newline = () => { this._regStr += '\\n'; return this; };

  /**
   * Carriage return character
   * The regex: '\r'
   */
  carriageReturn = () => { this._regStr += '\\r'; return this; };

  /**
   * Tab character
   * The regex: '\t'
   */
  tab = () => { this._regStr += '\\t'; return this; };

  // TODO:
  // escapeHexadecimalDigits = () => { this._regStr += '\\u'; return this; };
  // a = () => { this._regStr += '\\u'; return this; }; // \b & \B

  /**
   * A single digit
   *
   * The regex: `\d` the same as `[0-9]`
   */
  anyDigit = () => { this._regStr += '\\d'; return this; };

  /**
   * Not a digit
   *
   * The regex : `\D` same as `[^0-9]`
   */
  anyNonDigit = () => { this._regStr += '\\D'; return this; };

  /**
   * A partial set of Unicode whitespace characters
   *
   * The regex : `\s` same as `[\f\n\r\t\u000B\u0020\u00A0\u2028\u2029]`
   */
  whitespace = () => { this._regStr += '\\s'; return this; };

  /**
   * Not whitespace
   *
   * The regex : `\S` same as `[^\f\n\r\t\u000B\u0020\u00A0\u2028\u2029]`
   */
  notAWhitespace = () => { this._regStr += '\\S'; return this; };

  /**
   * Any word character (letter, number, underscore)
   *
   * The regex : `\w` same as `[0-9A-Z_a-z]`
   */
  anyWordCharacter = () => { this._regStr += '\\w'; return this; };

  /**
   * Any non-word character
   *
   * The regex : `\W` same as `[^0-9A-Z_a-z]`
   */
  anyNonWordCharacter = () => { this._regStr += '\\W'; return this; };

  // TODO: \1 \2 \3 \...

  // ==================================== GROUP ====================================

  /**
   * The characters that match the group will be captured.
   * Every capture group is given a number.
   * The first capturing ( in the regular expression is group 1.
   * The second capturing ( in theregular expression is group 2.
   *
   * The regex : `(xxx)`
   */
  capture = (expression: string) => this._group(expression, RegexpGroup.Capture);

  /**
   * A noncapturing group has a (?: prefix.
   * A noncapturing group simply matches;
   * it does not capture the matched text.
   * This has the advantage of slight faster performance.
   * Noncapturing groups do not interfere with the numbering of capturing groups.
   *
   * The regex : `(?:)`
   */
  nonCapture = (expression: string) => this._group(expression, RegexpGroup.NonCapture);

  /**
   * A positive lookahead group has a (?= prefix.
   * It is like a noncapturing group except that after the group matches,
   * the text is rewound to where the group started, effectively matching nothing.
   *
   * The regex : `(?=xxx)`
   */
  positiveLookahead = (expression: string) => this._group(expression, RegexpGroup.PositiveLookahead);

  /**
   * A negative lookahead group has a (?! prefix.
   * It is like a positive lookahead group,
   * except that it matches only if it fails to match
   *
   * The regex : `(?!xxx)`
   */
  negativeLookahead = (expression: string) => this._group(expression, RegexpGroup.NegativeLookahead);

  // ==================================== Class ====================================
  // like [...]

  /**
   * Demo: aSingleCharacterInString('abc') represent A single character of: a, b, or c
   * It will generate `[abc]`
   */
  aSingleCharacterInString = (str: string) => { this._regStr += `[${str}]`; return this; };

  /**
   * Demo anySingleCharacterExcept('abc') represent Any single character except: a, b, or c
   * It will generate `[^abc]`
   */
  anySingleCharacterExcept = (str: string) => { this._regStr += `[^${str}]`; return this; };

  // TODO: [a - z] [a-zA-Z] [0-9]

  build = () => {
    if (this._matchBegin) { this._regStr = '^' + this._regStr; }
    if (this._matchEnd) { this._regStr = this._regStr + '$'; }
    return this._regStr;
  }

  private _addParenthesesIfNeed = (expression: string): string => {
    return expression.length > 1 ? `(?:${expression})` : expression;
  }

  private _group = (expression: string, type: RegexpGroup) => {
    switch (type) {
      case RegexpGroup.Capture: this._regStr += `(${expression})`; break;
      case RegexpGroup.NonCapture: this._regStr += `(?:${expression})`; break;
      case RegexpGroup.PositiveLookahead: this._regStr += `(?=${expression})`; break;
      case RegexpGroup.NegativeLookahead: this._regStr += `(?!${expression})`; break;
    }
    return this;
  }
}
