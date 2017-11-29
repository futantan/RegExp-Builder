export class RegexBuilder {
  private _matchBegin: boolean = false;
  private _matchEnd: boolean = false;
  private _regStr: string = '';

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

  aSingleCharacter = () => {
    this._regStr += '.';
    return this;
  }

  build = () => {
    if (this._matchBegin) { this._regStr = '^' + this._regStr; }
    if (this._matchEnd) { this._regStr = this._regStr + '$'; }
    return this._regStr;
  }

  private _addParenthesesIfNeed = (expression: string): string => {
    return expression.length > 1 ? `(${expression})` : expression;
  }
}
