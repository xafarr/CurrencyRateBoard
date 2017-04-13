import {Observable} from "rxjs";
import {Currency} from "../model/currency";
import {CurrencyPairRates} from "../model/currency-pair-rates";

export interface RatesUpdateService<T> {
  getUpdatedCurrencyRates(baseCurrency: Currency, quoteCurrencies: Currency[]): Observable<CurrencyPairRates[]>;
}
