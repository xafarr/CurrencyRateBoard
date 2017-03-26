import {Currency} from "./currency";

export class CurrencyPairRates {
  constructor(private _baseCcy: Currency,
              private _quoteCcy: Currency,
              private _timeStamp: Date,
              private _spotRate: number,
              private _approxSupplierBuyRate: number,
              private _approxSupplierSellRate: number,
              private _buyRate: number,
              private _sellRate: number) {

  }

  get baseCcy(): Currency {
    return this._baseCcy;
  }

  get quoteCcy(): Currency {
    return this._quoteCcy;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }

  get spotRate(): number {
    return this._spotRate;
  }

  get approxSupplierBuyRate(): number {
    return this._approxSupplierBuyRate;
  }

  get approxSupplierSellRate(): number {
    return this._approxSupplierSellRate;
  }

  get buyRate(): number {
    return this._buyRate;
  }

  get sellRate(): number {
    return this._sellRate;
  }
}
