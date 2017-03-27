import {Observable} from "rxjs";

export interface RatesUpdateService<T> {
  getUpdatedCurrencyRates(baseCurrencyCode: string, quoteCurrencyCodes: string[]): Observable<T[]>;
}
