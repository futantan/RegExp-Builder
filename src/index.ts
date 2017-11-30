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

  // All characters are treated literally except for the control characters
  // and following special characters
  // private _specialcharacters = [
  //   '\\', '/', '[', ']', '(', ')', '{', '}', '?', '+', '*', '|', '.', '^', '$',
  // ];

  matchBegin = () => { this._matchBegin = true; return this; };
  matchEnd = () => { this._matchEnd = true; return this; };

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

  anyOf = (choices: string[]) => {
    this._regStr += `(${choices.join('|')})`;
    return this;
  }

  /**
   * Any single character
   *
   * The regex: `.`
   */
  anySingleCharacter = () => { this._regStr += '.'; return this; }

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

  // TODO: 3 of following
  // escapeHexadecimalDigits = () => { this._regStr += '\\u'; return this; };
  // a = () => { this._regStr += '\\u'; return this; }; // \b
  // a = () => { this._regStr += '\\u'; return this; }; // \D

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

  build = () => {
    if (this._matchBegin) { this._regStr = '^' + this._regStr; }
    if (this._matchEnd) { this._regStr = this._regStr + '$'; }
    return this._regStr;
  }

  private _addParenthesesIfNeed = (expression: string): string => {
    return expression.length > 1 ? `(${expression})` : expression;
  }
}
