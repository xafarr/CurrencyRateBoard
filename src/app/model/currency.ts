export class Currency {
  constructor(private _code: string,
              private _symbol: string,
              private _name: string,
              private _symbolNative: string,
              private _supplierPercentage: number,
              private _buyPercentage: number,
              private _sellPercentage: number,
              private _decimalDigits?: number,
              private _rounding?: number,
              private _namePlural?: string) {
  }

  get code(): string {
    return this._code;
  }

  get symbol(): string {
    return this._symbol;
  }

  get name(): string {
    return this._name;
  }

  get symbolNative(): string {
    return this._symbolNative;
  }

  get supplierPercentage(): number {
    return this._supplierPercentage;
  }

  get buyPercentage(): number {
    return this._buyPercentage;
  }

  get sellPercentage(): number {
    return this._sellPercentage;
  }

  get decimalDigits(): number {
    return this._decimalDigits;
  }

  get rounding(): number {
    return this._rounding;
  }

  get namePlural(): string {
    return this._namePlural;
  }
}
